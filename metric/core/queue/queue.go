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

	tasks := []models.Task{ }

	queue = make(helpers.PriorityQueue, len(tasks))

	for i := 0; i < len(tasks); i++ {
		task := &tasks[i]
		task.AttemptedAt = task.UpdatedAt
		queue[i] = task
	}
	heap.Init(&queue)

	go AdvanceTasks()
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