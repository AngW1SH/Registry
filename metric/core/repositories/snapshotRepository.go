package repositories

import (
	"core/models"
	"fmt"

	"gorm.io/gorm"
)

type SnapshotRepository struct {
	db *gorm.DB
}

func NewSnapshotRepository(db *gorm.DB) *SnapshotRepository {
	return &SnapshotRepository{db: db}
}

func (r *SnapshotRepository) Create(snapshot *models.Snapshot) RepositoryResult {

	groups := snapshot.Groups

	err := r.db.Create(&models.SnapshotDB{Metric: snapshot.Metric, Data: snapshot.Data}).Error

	fmt.Println(groups)

	if len(groups) > 0 {

		groupsDB := []models.SnapshotGroupDB{}

		for _, group := range groups {
			groupsDB = append(groupsDB, models.SnapshotGroupDB{
				Metric: snapshot.Metric,
				Name: group,
			})
		}

		err = r.db.CreateInBatches(&groupsDB, len(groupsDB)).Error
	}

	if err != nil {
		return RepositoryResult{Error: err}
	}

	return RepositoryResult{Result: snapshot}
}
