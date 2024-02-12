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

var repo *repositories.SnapshotRepository

var limit, load int

var queue helpers.PriorityQueue

func InitializeQueue(lim int, repository *repositories.SnapshotRepository) {
	limit = lim
	load = 0
	repo = repository

	queue = helpers.PriorityQueue{}

	heap.Init(&queue)

	go AdvanceTasks()
}

func AddTask(data *models.TaskCreate) *models.Task {
	task := models.Task{
		Id: uuid.New(),
		Metric: data.Metric,
		Weight: data.Weight,
		UpdatedAt: data.UpdatedAt,
		UpdateRate: data.UpdateRate,
		Data: data.Data,
	}

	task.AttemptedAt = task.UpdatedAt
	task.IsDeleted = false

	heap.Push(&queue, &task)

	return &task
}

func DeleteTask(id uuid.UUID) (*models.Task, error) {

	return queue.MarkDelete(id)
}

func ListTasks() ([]*models.Task, error) {
	return queue.GetEntries(), nil
}

func onFinish(task models.Task, result string) {
	load -= task.Weight

	repo.Create(&models.Snapshot{Metric: task.Metric, Data: result})

	task.UpdatedAt = time.Now()
	task.AttemptedAt = time.Now()

	heap.Push(&queue, &task)
}

func AdvanceTasks() {
	for ;; {

		if (queue.Len() == 0) {
			time.Sleep(time.Second)
			continue;
		}

		for load < limit {
			if queue.Len() == 0 || (load + queue.Peek().Weight > limit) {
				break
			}
	
			oldestUpdated := heap.Pop(&queue).(*models.Task)
			found := false

			if oldestUpdated.IsDeleted {
				continue
			}
	
			if metrics.List[oldestUpdated.Metric] != nil {
				if time.Since(oldestUpdated.UpdatedAt) > oldestUpdated.UpdateRate {
					metrics.Run(*oldestUpdated, metrics.List[oldestUpdated.Metric], onFinish);
					found = true
				} else {
					oldestUpdated.AttemptedAt = time.Now()
					heap.Push(&queue, oldestUpdated)
				}
			}
	
			if found {
				load += oldestUpdated.Weight		
			}
		}

		time.Sleep(time.Second)
	}
}