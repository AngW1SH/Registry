package queue

import (
	"container/heap"
	"core/helpers"
	"core/metrics"
	"core/models"
	"time"
)

var limit int

var queue helpers.PriorityQueue

func InitializeQueue(lim int) {
	limit = lim

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

func AdvanceTasks() {
	load := 0
	queueIndex := 0

	for load + queue[queueIndex].Weight < limit {

		found := false

		for _, v := range metrics.List {
			if (v.Name == queue[queueIndex].Metric) {
				v.Payload()
				found = true
			}
		}

		if found {
			load += queue[queueIndex].Weight
		}
	}
}