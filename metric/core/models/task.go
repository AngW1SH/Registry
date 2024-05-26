package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type TaskCreate struct {
	Metric string // Metric name. Used for finding the corresponding function in "tasks"
	Data string // JSON encoded params defined outside of this server (passed through gRPC)
	UpdatedAt time.Time // Last update time
	Groups []string  // List of groups/tags defined outside of this server (passed through gRPC)
	UpdateRate time.Duration // How often the task should be executed
	IsPublic  bool // Tells if the snapshot data is allowed to be sent through gRPC API
	Weight int  // Computational weight. The maximum cumulative weight is defined in main.go
	CreatedAt   time.Time // Becomes StartTime in db. Used to halt task execution until the "CreatedAt" moment
	DeletedAt   time.Time // Becomes StopTime in db. Used to automatically delete task at the "DeletedAt" moment
}

type Task struct {
	Id          uuid.UUID
	Metric      string  // Metric name. Used for finding the corresponding function in "tasks"
	Data        string  // JSON encoded params defined outside of this server (passed through gRPC)
	UpdatedAt   time.Time // Last update time
	Groups      []string  // List of groups/tags defined outside of this server (passed through gRPC)
	AttemptedAt time.Time // Last attempted time. Used for building the task queue
	UpdateRate  time.Duration // How often the task should be executed
	IsPublic    bool // Tells if the snapshot data is allowed to be sent through gRPC API
	Weight      int  // Computational weight. The maximum cumulative weight is defined in main.go
	CreatedAt   time.Time // Becomes StartTime in db. Used to halt task execution until the "CreatedAt" moment
	DeletedAt   time.Time // Becomes StopTime in db. Used to automatically delete task at the "DeletedAt" moment
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