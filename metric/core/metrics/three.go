package metrics

import (
	"fmt"
	"time"
)

func MetricThree(data interface{}) string {
	time.Sleep(8 * time.Second)
	fmt.Println("Metric three done", data)

	return "3"
}