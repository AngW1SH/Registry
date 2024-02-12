package repositories

import (
	"core/models"

	"gorm.io/gorm"
)

type SnapshotRepository struct {
	db *gorm.DB
}

func NewSnapshotRepository(db *gorm.DB) *SnapshotRepository {
	return &SnapshotRepository{db: db}
}

func (r *SnapshotRepository) Create(snapshot *models.Snapshot) RepositoryResult {
	err := r.db.Create(snapshot).Error

	if err != nil {
		return RepositoryResult{Error: err}
	}

	return RepositoryResult{Result: snapshot}
}
