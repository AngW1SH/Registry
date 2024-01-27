package queue

import (
	"core/metrics"
	"core/models"
	"time"
)

var limit int

var queue []models.Task

func InitializeQueue(lim int) {
	limit = lim

	queue = []models.Task{ 
		{ Metric: "1", Data: []string{ "1-1", "1-2" }, UpdatedAt: time.Now(), Weight: 1 },
		{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Now(), Weight: 2 },
		{ Metric: "1", Data: []string{ "1-3", "1-4" }, UpdatedAt: time.Now(), Weight: 3 },
		{ Metric: "3", Data: []string{ "3" }, UpdatedAt: time.Now(), Weight: 4 },
		{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Now(), Weight: 1 },
	}

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