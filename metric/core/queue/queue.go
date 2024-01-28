package queue

import (
	"container/heap"
	"core/helpers"
	"core/metrics"
	"core/models"
	"time"
)

var limit, load int

var queue helpers.PriorityQueue


func InitializeQueue(lim int) {
	limit = lim
	load = 0

	tasks := []models.Task{ 
		{ Metric: "1", Data: []string{ "1-1", "1-2" }, UpdatedAt: time.Date(2024, time.January, 28, 12, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second },
		{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 13, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second },
		{ Metric: "1", Data: []string{ "1-3", "1-4" }, UpdatedAt: time.Date(2024, time.January, 28, 14, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second },
		{ Metric: "3", Data: []string{ "3" }, UpdatedAt: time.Date(2024, time.January, 28, 10, 0, 0, 0, time.UTC), Weight: 4, UpdateRate: 20 * time.Second },
		{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 9, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second },
	}

	queue = make(helpers.PriorityQueue, len(tasks))

	for i := 0; i < len(tasks); i++ {
		task := &tasks[i]
		task.AttemptedAt = task.UpdatedAt
		queue[i] = task
	}
	heap.Init(&queue)

	AdvanceTasks()
}

func AddTask(task models.Task) {
	task.AttemptedAt = task.UpdatedAt
	heap.Push(&queue, &task)
}

func onFinish(task models.Task) {
	load -= task.Weight

	task.UpdatedAt = time.Now()
	task.AttemptedAt = time.Now()

	heap.Push(&queue, &task)

	AdvanceTasks()
}

func AdvanceTasks() {

	for load + queue.Peek().Weight <= limit {
		oldestUpdated := heap.Pop(&queue).(*models.Task)
		found := false

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
}