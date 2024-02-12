package metrics

import (
	"core/models"
	"sync"
)

func Run(metric models.Task, payload func(data interface{}) string, callback func(metric models.Task, result string)) {
	var wg sync.WaitGroup

	var result string

	wg.Add(1)

	go func() {
		defer wg.Done()
		result = payload(metric.Data)
	}()

	go func() {
		wg.Wait()
		callback(metric, result)
	}()
}