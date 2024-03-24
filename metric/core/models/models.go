package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Task struct {
	Id uuid.UUID
	Metric    string
	Data      string
	UpdatedAt time.Time
	Groups []string
	AttemptedAt time.Time
	UpdateRate time.Duration
	IsDeleted bool
	Weight 	  int
}

type TaskDB struct {
	ID string `gorm:"primaryKey"`
	Metric    string
	Data      string
	UpdatedAt time.Time
	Groups pq.StringArray `gorm:"type:text[]"`
	AttemptedAt time.Time
	UpdateRate string
	Weight 	  int
}


type TaskCreate struct {
	Metric string
	UpdatedAt time.Time
	UpdateRate time.Duration
	Groups []string
	Weight int
	Data string
}

type MetricType struct {
	Name string
	Payload func()
}

type Snapshot struct {
	Metric string
	Data string
	Groups []string
	Error string
	Timestamp time.Time
}

type SnapshotDB struct {
	gorm.Model
	Metric string
	Data string
	Error string
	Groups []SnapshotGroupDB
}

// Sort of like a className in CSS,
// Used to group metrics by project or group of projects
// A snapshot can have multiple groups
type SnapshotGroupDB struct {
	gorm.Model
	Name string
	SnapshotDBID uint 
}