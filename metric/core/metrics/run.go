package metrics

import (
	"core/models"
	"core/repositories"
	"sync"
)

func Run(task models.Task, payload func(task models.Task, repo *repositories.SnapshotRepository), callback func(metric models.Task), repo *repositories.SnapshotRepository) {
	var wg sync.WaitGroup

	wg.Add(1)

	go func() {
		defer wg.Done()
		payload(task, repo)
	}()

	go func() {
		wg.Wait()
		callback(task)
	}()
}