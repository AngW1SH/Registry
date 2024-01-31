package metrics

import (
	"fmt"
	"time"
)

func MetricOne(data interface{}) {
	time.Sleep(2 * time.Second)
	fmt.Println("Metric one done", data)
}