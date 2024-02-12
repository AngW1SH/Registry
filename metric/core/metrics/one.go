package metrics

import (
	"fmt"
	"time"
)

func MetricOne(data interface{}) string {
	time.Sleep(2 * time.Second)
	fmt.Println("Metric one done", data)

	return "1"
}