package models

import (
	"time"

	"gorm.io/gorm"
)

type SnapshotParam struct {
	Name  string
	Value string
}

type Snapshot struct {
	Metric    string
	Data      string
	Groups    []string
	Error     string
	IsPublic  bool
	Params    []SnapshotParam
	Timestamp time.Time
}

type SnapshotDB struct {
	gorm.Model
	Metric   string
	Data     string
	Error    string
	IsPublic bool
	Groups   []SnapshotGroupDB
	Params   []SnapshotParamDB
}

// Sort of like a className in CSS,
// Used to group metrics by project or group of projects
// A snapshot can have multiple groups
type SnapshotGroupDB struct {
	gorm.Model
	Name         string
	SnapshotDBID uint
}

type SnapshotParamDB struct {
	gorm.Model
	Name         string
	Value        string
	SnapshotDBID uint
}