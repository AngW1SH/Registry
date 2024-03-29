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
	params := snapshot.Params

	snapshotDB := models.SnapshotDB{Metric: snapshot.Metric, Data: snapshot.Data}

	err := r.db.Create(&snapshotDB).Error

	fmt.Println(groups)

	if len(groups) > 0 {

		groupsDB := []models.SnapshotGroupDB{}

		for _, group := range groups {
			groupsDB = append(groupsDB, models.SnapshotGroupDB{
				SnapshotDBID: snapshotDB.ID,
				Name: group,
			})
		}

		err = r.db.CreateInBatches(&groupsDB, len(groupsDB)).Error
	}

	if len(params) > 0 {

		paramsDB := []models.SnapshotParamDB{}

		for _, param := range params {
			paramsDB = append(paramsDB, models.SnapshotParamDB{
				SnapshotDBID: snapshotDB.ID,
				Name: param.Name,
				Value: param.Value,
			})
		}

		err = r.db.CreateInBatches(&paramsDB, len(paramsDB)).Error
	}

	if err != nil {
		return RepositoryResult{Error: err}
	}

	return RepositoryResult{Result: snapshot}
}

func (r *SnapshotRepository) GetByGroup(group string) ([]models.SnapshotDB, error) {
	var snapshots []models.SnapshotDB

	err := r.db.Preload("Groups").Where("id IN (?)", r.db.Table("snapshot_group_dbs").Select("snapshot_db_id").Where("name = ?", group)).Find(&snapshots).Error

	return snapshots, err
}
