package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type Task struct {
	Id          uuid.UUID
	Metric      string
	Data        string
	UpdatedAt   time.Time
	Groups      []string
	AttemptedAt time.Time
	UpdateRate  time.Duration
	IsPublic    bool // Tells if the snapshot data is allowed to be sent through gRPC API
	Weight      int
	CreatedAt   time.Time
	DeletedAt   time.Time
}

type TaskDB struct {
	ID         string `gorm:"primaryKey"`
	Metric     string
	Data       string
	UpdatedAt  time.Time
	Groups     pq.StringArray `gorm:"type:text[]"`
	UpdateRate string
	IsPublic   bool
	Weight     int
	StartTime   time.Time
	StopTime   time.Time
}

type TaskCreate struct {
	Metric string
	UpdatedAt time.Time
	UpdateRate time.Duration
	Groups []string
	Weight int
	Data string
	IsPublic  bool
	CreatedAt   time.Time
	DeletedAt   time.Time
}

func NewTask(data *TaskCreate) Task {
	return Task{
		Id: uuid.New(),
		Metric: data.Metric,
		Weight: data.Weight,
		Groups: data.Groups,
		UpdatedAt: time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC),
		UpdateRate: data.UpdateRate,
		Data: data.Data,
		IsPublic: data.IsPublic,
		CreatedAt: data.CreatedAt,
		DeletedAt: data.DeletedAt,
	}
}