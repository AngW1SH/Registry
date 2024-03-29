package metrics

import (
	"core/models"
	"core/repositories"
	"sync"
)

func Run(task models.Task, payload func(task models.Task, repo *repositories.SnapshotRepository) (string, error), callback func(metric models.Task, result string, err error), repo *repositories.SnapshotRepository) {
	var wg sync.WaitGroup

	var result string
	var err error

	wg.Add(1)

	go func() {
		defer wg.Done()
		result, err = payload(task, repo)
	}()

	go func() {
		wg.Wait()
		callback(task, result, err)
	}()
}