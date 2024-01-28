package metrics

import (
	"core/models"
	"sync"
)

func Run(metric models.Task, payload func(data interface{}), callback func(metric models.Task)) {
	var wg sync.WaitGroup

	wg.Add(1)

	go func() {
		defer wg.Done()
		payload(metric.Data)
	}()

	go func() {
		wg.Wait()
		callback(metric)
	}()
}