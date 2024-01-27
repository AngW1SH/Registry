package models

import "time"

type Task struct {
	Metric    string
	Data      []string
	UpdatedAt time.Time
	Weight 	  int
}

type MetricType struct {
	Name string
	Payload func()
}