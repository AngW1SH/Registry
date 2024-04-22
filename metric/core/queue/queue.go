package queue

import (
	"container/heap"
	"core/helpers"
	"core/models"
	"core/repositories"
	"core/structures"
	"core/tasks"
	"time"
)
type Queue struct {
	Limit int
	load int
	snapshotRepo *repositories.SnapshotRepository
	taskRepo *repositories.TaskRepository
	queue structures.PriorityQueue
	tasks structures.TaskMap
}

func NewQueue(limit int, snapshotRepo *repositories.SnapshotRepository, taskRepo *repositories.TaskRepository) *Queue {
	return &Queue{Limit: limit, load: 0, snapshotRepo: snapshotRepo, taskRepo: taskRepo}
}

func (q *Queue) Start() {
	q.queue = structures.PriorityQueue{}
	q.tasks = *structures.NewTaskMap()

	heap.Init(&q.queue)

	tasks, err := q.taskRepo.GetAll()

	if err != nil {
		panic(err)
	}

	for _, task := range tasks {
		heap.Push(&q.queue, task)
		q.tasks.AddTask(task)
	}

	go q.AdvanceTasks()
}

func (q *Queue) AddTask(data *models.TaskCreate) *models.Task {

	activeTasks := q.tasks.GetByGroups(data.Groups)

	for _, task := range activeTasks {
		if task.Metric == data.Metric {
			return nil
		}
	}

	task := models.NewTask(data)

	task.AttemptedAt = task.UpdatedAt
	task.IsDeleted = false

	q.tasks.AddTask(&task)
	heap.Push(&q.queue, &task)

	q.taskRepo.Create(&task)

	return &task
}

func (q *Queue) UpdateGroupName(old string, new string) error {
	updatedTasks := q.tasks.UpdateGroupName(old, new)

	for _, task := range updatedTasks {
		q.taskRepo.Update(task)
	}

	err := q.snapshotRepo.UpdateGroupName(old, new)

	return err
}

func (q *Queue) ForceExecute(metric string, groups []string) (*models.Task, error) {

	task, err := q.tasks.ForceUpdate(metric, groups)
	
	if err != nil {
		return nil, err
	}

	q.queue.Rebuild()

	return task, nil
}

func (q *Queue) DeleteTask(metric string, groups []string, deleteSnapshots bool) (*models.Task, error) {

	if deleteSnapshots {
		err := q.snapshotRepo.DeleteByMetric(metric, groups)

		if err != nil {
			return nil, err
		}
	}

	task, err := q.tasks.MarkDelete(metric, groups)

	if err != nil {
		return nil, err
	}

	q.taskRepo.Delete(task.Id)

	return task, nil
}

func (q *Queue) ListTasks(groups []string) []*models.Task {
	tasks := q.tasks.GetByGroups(groups)
	
	return tasks
}

func (q *Queue) UpdateTask(task *models.TaskCreate) (*models.Task, error) {
	result, err := q.tasks.UpdateTask(task)

	if err != nil {
		return nil, err
	}
	
	q.taskRepo.Update(result)
	q.queue.Rebuild()

	return result, nil
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
			
			oldestUpdated := helpers.CopyTask(heap.Pop(&q.queue).(*models.Task))

			if oldestUpdated.IsDeleted {
				q.tasks.DeleteTask(oldestUpdated.Id)
				continue
			}
	
			if tasks.List[oldestUpdated.Metric] != nil {
				if time.Since(oldestUpdated.UpdatedAt) > oldestUpdated.UpdateRate {
					tasks.Run(*oldestUpdated, tasks.List[oldestUpdated.Metric], q.onFinish, q.snapshotRepo);
					q.load += oldestUpdated.Weight
				} else if q.tasks.GetTask(oldestUpdated.Id) != nil {
					q.tasks.GetTask(oldestUpdated.Id).AttemptedAt = time.Now()

					heap.Push(&q.queue, q.tasks.GetTask(oldestUpdated.Id))
				} else {
					q.tasks.DeleteTask(oldestUpdated.Id)
					continue
				}
			}
		}

		time.Sleep(time.Second)
	}
}