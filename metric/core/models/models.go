package models

import "time"

type Task struct {
	Metric    string
	Data      []string
	UpdatedAt time.Time
	AttemptedAt time.Time
	UpdateRate time.Duration
	Weight 	  int
}

type MetricType struct {
	Name string
	Payload func()
}