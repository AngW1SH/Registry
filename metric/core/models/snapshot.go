package models

import (
	"database/sql"
	"time"

	"gorm.io/gorm"
)

type SnapshotParam struct {
	Name  string
	Value string
}

type Snapshot struct {
	Metric    string // Metric name
	Data      string // JSON encoded data
	Error     string // Error message. Empty if no error
	IsPublic  bool // Should we send this snapshot over gRPC
	Groups    []string // List of groups/tags defined outside of this server (passed through gRPC)
	Params    []SnapshotParam // { name: string, value: string }. Used for DB querying
	Timestamp time.Time
}

type SnapshotDB struct {
	gorm.Model
	OutdatedAt sql.NullTime // Can be used in tasks to mark a snapshot as outdated and not send it over gRPC
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