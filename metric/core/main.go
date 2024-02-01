package main

import (
	"core/models"
	"core/queue"
	"time"

	"github.com/google/uuid"
)

func init() {
	queue.InitializeQueue(4)
}

func main() {
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "1", Data: []string{ "1-1", "1-2" }, UpdatedAt: time.Date(2024, time.January, 28, 12, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 13, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "1", Data: []string{ "1-3", "1-4" }, UpdatedAt: time.Date(2024, time.January, 28, 14, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "3", Data: []string{ "3" }, UpdatedAt: time.Date(2024, time.January, 28, 10, 0, 0, 0, time.UTC), Weight: 4, UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 9, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second })
	for true {}
}