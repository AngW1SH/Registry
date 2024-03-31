package models


type MetricType struct {
	Name string
	Payload func()
}