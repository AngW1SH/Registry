package metrics

import (
	"fmt"
	"time"
)

func MetricThree(data interface{}) {
	time.Sleep(8 * time.Second)
	fmt.Println("Metric three done", data)
}