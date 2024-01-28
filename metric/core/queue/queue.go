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
		{ Metric: "1", Data: []string{ "1-1", "1-2" }, UpdatedAt: time.Now(), Weight: 1 },
		{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Now(), Weight: 2 },
		{ Metric: "1", Data: []string{ "1-3", "1-4" }, UpdatedAt: time.Now(), Weight: 3 },
		{ Metric: "3", Data: []string{ "3" }, UpdatedAt: time.Now(), Weight: 4 },
		{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Now(), Weight: 1 },
	}

	queue = make(helpers.PriorityQueue, len(tasks))

	for i, obj := range(tasks) {
		queue[i] = &obj
	}
	heap.Init(&queue)

	AdvanceTasks()
}

func onFinish(task models.Task) {
	load -= task.Weight

	task.UpdatedAt = time.Now()

	heap.Push(&queue, task)

	AdvanceTasks()
}

func AdvanceTasks() {

	for load + queue.Peek().Weight < limit {

		oldestUpdated := heap.Pop(&queue).(*models.Task)

		found := false

		if metrics.List[oldestUpdated.Metric] != nil {
			metrics.Run(*oldestUpdated, metrics.List[oldestUpdated.Metric], onFinish);
			found = true
		}

		if found {
			load += oldestUpdated.Weight		
		}
	}
}