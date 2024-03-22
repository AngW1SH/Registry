package metrics

import (
	"encoding/json"
	"fmt"
	"time"
)

type ReturnValue struct {
	Value uint `json:"value"`
}

func CommitsPerDayMetric(data interface{}) (string, error) {
	time.Sleep(2 * time.Second)
	fmt.Println("CommitsPerDay done", data)

	result, error := json.Marshal(ReturnValue{
		Value: 1,
	})

	if error != nil {
		fmt.Println(error)
		return "", nil
	}

	return string(result), nil
}