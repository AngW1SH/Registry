package queue

import (
	"container/heap"
	"core/helpers"
	"core/metrics"
	"core/models"
	"core/repositories"
	"errors"
	"time"

	"github.com/google/uuid"
)
type Queue struct {
	Limit int
	load int
	snapshotRepo *repositories.SnapshotRepository
	taskRepo *repositories.TaskRepository
	queue helpers.PriorityQueue
	tasks helpers.TaskMap
}

func NewQueue(limit int, snapshotRepo *repositories.SnapshotRepository, taskRepo *repositories.TaskRepository) *Queue {
	return &Queue{Limit: limit, load: 0, snapshotRepo: snapshotRepo, taskRepo: taskRepo}
}

func (q *Queue) Start() {
	q.queue = helpers.PriorityQueue{}
	q.tasks = *helpers.NewTaskMap()

	heap.Init(&q.queue)

	tasks, err := q.taskRepo.GetAll()

	if err != nil {
		panic(err)
	}

	for _, task := range tasks {
		heap.Push(&q.queue, task)
		q.tasks.AddTask(task.Id, task)
	}

	go q.AdvanceTasks()
}

func (q *Queue) AddTask(data *models.TaskCreate) *models.Task {

	var found *models.Task
	activeTasks := q.tasks.GetByGroups(data.Groups)

	for _, task := range activeTasks {
		if task.Metric == data.Metric {
			found = task
			break
		}
	}

	if found != nil {
		return found
	}

	task := models.Task{
		Id: uuid.New(),
		Metric: data.Metric,
		Weight: data.Weight,
		Groups: data.Groups,
		UpdatedAt: data.UpdatedAt,
		UpdateRate: data.UpdateRate,
		Data: data.Data,
		IsPublic: data.IsPublic,
	}

	task.AttemptedAt = task.UpdatedAt
	task.IsDeleted = false

	q.tasks.AddTask(task.Id, &task)
	heap.Push(&q.queue, &task)

	q.taskRepo.Create(&task)

	return &task
}

func (q *Queue) DeleteTask(metric string, groups []string) (*models.Task, error) {

	task := q.tasks.MarkDelete(metric, groups)

	if task == nil {
		return nil, errors.New("task not found")
	}

	if task != nil {
		q.taskRepo.Delete(task.Id)
	}

	return task, nil
}

func (q *Queue) ListTasks(groups []string) ([]*models.Task, error) {
	tasks := q.tasks.GetByGroups(groups)
	
	return tasks, nil
}

func (q *Queue) UpdateTask(task *models.TaskCreate) *models.Task {
	result := q.tasks.UpdateTask(task)

	if result != nil {
		q.taskRepo.Update(result)
	}

	return result
}

func (q *Queue) onFinish(task models.Task) {
	q.load -= task.Weight

	if q.tasks.GetTask(task.Id) != nil && !q.tasks.GetTask(task.Id).IsDeleted {

		q.tasks.GetTask(task.Id).UpdatedAt = time.Now()
		q.tasks.GetTask(task.Id).AttemptedAt = time.Now()

		heap.Push(&q.queue, q.tasks.GetTask(task.Id))

		q.taskRepo.Update(q.tasks.GetTask(task.Id))
	} else {
		q.taskRepo.Delete(task.Id)
	}
}

func (q *Queue) AdvanceTasks() {
	for ;; {
		if (q.queue.Len() == 0) {
			time.Sleep(time.Second)
			continue;
		}

		for q.load < q.Limit {
			peek := q.queue.Peek()
			if peek == nil || q.queue.Len() == 0 || (q.load + peek.Weight > q.Limit) {
				break
			}
	
			originalOldestUpdated := heap.Pop(&q.queue).(*models.Task)
			
			oldestUpdated := helpers.CopyTask(originalOldestUpdated)

			found := false

			if oldestUpdated.IsDeleted {
				q.tasks.DeleteTask(oldestUpdated.Id)
				continue
			}
	
			if metrics.List[oldestUpdated.Metric] != nil {
				if time.Since(oldestUpdated.UpdatedAt) > oldestUpdated.UpdateRate {
					metrics.Run(*oldestUpdated, metrics.List[oldestUpdated.Metric], q.onFinish, q.snapshotRepo);
					found = true
				} else if q.tasks.GetTask(oldestUpdated.Id) != nil {
					q.tasks.GetTask(oldestUpdated.Id).AttemptedAt = time.Now()

					heap.Push(&q.queue, q.tasks.GetTask(oldestUpdated.Id))
				} else {
					q.tasks.DeleteTask(oldestUpdated.Id)
					continue
				}
			}
	
			if found {
				q.load += oldestUpdated.Weight		
			}
		}

		time.Sleep(time.Second)
	}
}