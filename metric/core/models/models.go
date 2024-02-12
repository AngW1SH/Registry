package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Task struct {
	Id uuid.UUID
	Metric    string
	Data      []string
	UpdatedAt time.Time
	AttemptedAt time.Time
	UpdateRate time.Duration
	IsDeleted bool
	Weight 	  int
}

type TaskCreate struct {
	Metric string
	UpdatedAt time.Time
	UpdateRate time.Duration
	Weight int
	Data []string
}

type MetricType struct {
	Name string
	Payload func()
}

type Snapshot struct {
	gorm.Model
	Metric string
	Data string
}