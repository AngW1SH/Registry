package metrics

import (
	"fmt"
	"time"
)

func MetricTwo(data interface{}) {
	time.Sleep(2 * time.Second)
	fmt.Println("Metric two done", data)
}