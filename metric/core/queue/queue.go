package queue

import (
	"container/heap"
	"core/helpers"
	"core/metrics"
	"core/models"
	"core/repositories"
	"time"

	"github.com/google/uuid"
)
type Queue struct {
	Limit int
	load int
	snapshotRepo *repositories.SnapshotRepository
	taskRepo *repositories.TaskRepository
	queue helpers.PriorityQueue
}

func NewQueue(limit int, snapshotRepo *repositories.SnapshotRepository, taskRepo *repositories.TaskRepository) *Queue {
	return &Queue{Limit: limit, load: 0, snapshotRepo: snapshotRepo, taskRepo: taskRepo}
}

func (q *Queue) Start() {
	q.queue = helpers.PriorityQueue{}

	heap.Init(&q.queue)

	tasks, err := q.taskRepo.GetAll()

	if err != nil {
		panic(err)
	}

	for _, task := range tasks {
		heap.Push(&q.queue, task)
	}

	go q.AdvanceTasks()
}

func (q *Queue) AddTask(data *models.TaskCreate) *models.Task {
	task := models.Task{
		Id: uuid.New(),
		Metric: data.Metric,
		Weight: data.Weight,
		Groups: data.Groups,
		UpdatedAt: data.UpdatedAt,
		UpdateRate: data.UpdateRate,
		Data: data.Data,
	}

	task.AttemptedAt = task.UpdatedAt
	task.IsDeleted = false

	heap.Push(&q.queue, &task)

	q.taskRepo.Create(&task)

	return &task
}

func (q *Queue) DeleteTask(metric string, groups []string) (*models.Task, error) {
	task, err := q.queue.MarkDelete(metric, groups)

	if err != nil {
		return nil, err
	}

	if task != nil {
		q.taskRepo.Delete(task.Id)
	}

	return task, err
}

func (q *Queue) ListTasks(groups []string) ([]*models.Task, error) {
	return q.queue.GetEntries(groups), nil
}

func (q *Queue) UpdateTask(task *models.TaskCreate) *models.Task {
	return q.queue.Update(task)
}

func (q *Queue) onFinish(task models.Task, result string, err error) {
	q.load -= task.Weight

	var errText string

	if (err != nil) {
		errText = err.Error()
	}

	q.snapshotRepo.Create(&models.Snapshot{Metric: task.Metric, Data: result, Groups: task.Groups, Error: errText})

	task.UpdatedAt = time.Now()
	task.AttemptedAt = time.Now()

	q.taskRepo.Delete(task.Id)
	q.taskRepo.Create(&task)

	heap.Push(&q.queue, &task)
}

func (q *Queue) AdvanceTasks() {
	for ;; {
		if (q.queue.Len() == 0) {
			time.Sleep(time.Second)
			continue;
		}

		for q.load < q.Limit {
			if q.queue.Len() == 0 || (q.load + q.queue.Peek().Weight > q.Limit) {
				break
			}
	
			oldestUpdated := heap.Pop(&q.queue).(*models.Task)
			found := false

			if oldestUpdated.IsDeleted {
				continue
			}
	
			if metrics.List[oldestUpdated.Metric] != nil {
				if time.Since(oldestUpdated.UpdatedAt) > oldestUpdated.UpdateRate {
					metrics.Run(*oldestUpdated, metrics.List[oldestUpdated.Metric], q.onFinish);
					found = true
				} else {
					oldestUpdated.AttemptedAt = time.Now()
					heap.Push(&q.queue, oldestUpdated)
				}
			}
	
			if found {
				q.load += oldestUpdated.Weight		
			}
		}

		time.Sleep(time.Second)
	}
}