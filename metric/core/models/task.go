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
	IsDeleted   bool
	IsPublic    bool // Tells if the snapshot data is allowed to be sent through gRPC API
	Weight      int
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
}

type TaskCreate struct {
	Metric string
	UpdatedAt time.Time
	UpdateRate time.Duration
	Groups []string
	Weight int
	Data string
	IsPublic  bool
}