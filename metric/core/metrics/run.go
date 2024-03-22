package metrics

import (
	"core/models"
	"sync"
)

func Run(metric models.Task, payload func(data interface{}) (string, error), callback func(metric models.Task, result string, err error)) {
	var wg sync.WaitGroup

	var result string
	var err error

	wg.Add(1)

	go func() {
		defer wg.Done()
		result, err = payload(metric.Data)
	}()

	go func() {
		wg.Wait()
		callback(metric, result, err)
	}()
}