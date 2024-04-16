package repositories

import (
	"core/models"
	"fmt"
	"time"

	"gorm.io/gorm"
)

type SnapshotRepository struct {
	db *gorm.DB
	Stream chan []*models.SnapshotDB
}

func NewSnapshotRepository(db *gorm.DB) *SnapshotRepository {
	return &SnapshotRepository{db: db, Stream: make(chan []*models.SnapshotDB)}
}

func (r *SnapshotRepository) Create(snapshot *models.Snapshot) RepositoryResult {

	groups := snapshot.Groups
	params := snapshot.Params

	snapshotDB := models.SnapshotDB{Metric: snapshot.Metric, Data: snapshot.Data, IsPublic: snapshot.IsPublic, Error: snapshot.Error}

	err := r.db.Create(&snapshotDB).Error

	if err != nil {
		return RepositoryResult{Error: err}
	}

	if len(groups) > 0 {

		groupsDB := []models.SnapshotGroupDB{}

		for _, group := range groups {
			groupsDB = append(groupsDB, models.SnapshotGroupDB{
				SnapshotDBID: snapshotDB.ID,
				Name: group,
			})
		}

		err = r.db.CreateInBatches(&groupsDB, len(groupsDB)).Error

		if err != nil {
			return RepositoryResult{Error: err}
		}

		snapshotDB.Groups = groupsDB
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

		if err != nil {
			return RepositoryResult{Error: err}
		}

		snapshotDB.Params = paramsDB
	}

	if snapshotDB.IsPublic {
		r.Stream <- []*models.SnapshotDB{&snapshotDB}
	}

	return RepositoryResult{Result: snapshot}
}

func (r *SnapshotRepository) CreateInBatches(snapshots []*models.Snapshot) RepositoryResult {

	var snapshotDBList []*models.SnapshotDB

	for _, snapshot := range snapshots {
		snapshotDBList = append(snapshotDBList, &models.SnapshotDB{
			Metric: snapshot.Metric,
			Data: snapshot.Data,
			IsPublic: snapshot.IsPublic,
			Error: snapshot.Error,
		})
	}

	err := r.db.CreateInBatches(&snapshotDBList, len(snapshots)).Error

	if err != nil {
		return RepositoryResult{Error: err}
	}

	var groups []models.SnapshotGroupDB
	var params []models.SnapshotParamDB

	for i, snapshot := range snapshotDBList {
		for _, group := range snapshots[i].Groups {
			groups = append(groups, models.SnapshotGroupDB{
				SnapshotDBID: snapshot.ID,
				Name: group,
			})
		}
	}

	for i, snapshot := range snapshotDBList {
		for _, param := range snapshots[i].Params {
			params = append(params, models.SnapshotParamDB{
				SnapshotDBID: snapshot.ID,
				Name: param.Name,
				Value: param.Value,
			})
		}
	}

	err = r.db.CreateInBatches(&groups, len(groups)).Error

	if err != nil {
		return RepositoryResult{Error: err}
	}

	for _, group := range groups {
		for i, snapshot := range snapshotDBList {
			if snapshot.ID == group.SnapshotDBID {
				snapshotDBList[i].Groups = append(snapshotDBList[i].Groups, group)
			}
		}
	}

	err = r.db.CreateInBatches(&params, len(params)).Error

	if err != nil {
		return RepositoryResult{Error: err}
	}

	for _, param := range params {
		for i, snapshot := range snapshotDBList {
			if snapshot.ID == param.SnapshotDBID {
				snapshotDBList[i].Params = append(snapshotDBList[i].Params, param)
			}
		}
	}

	var snapshotsToSend []*models.SnapshotDB

	for _, snapshot := range snapshotDBList {
		if snapshot.IsPublic {
			snapshotsToSend = append(snapshotsToSend, snapshot)
		}
	}

	r.Stream <- snapshotsToSend

	return RepositoryResult{Result: snapshots}
}

func (r *SnapshotRepository) GetByGroup(group string) ([]models.SnapshotDB, error) {
	var snapshots []models.SnapshotDB

	err := r.db.Preload("Groups").Where("id IN (?)", r.db.Table("snapshot_group_dbs").Select("snapshot_db_id").Where("name = ?", group)).Where("snapshot_dbs.is_public IS TRUE").Where("snapshot_dbs.outdated_at IS NULL").Find(&snapshots).Error

	return snapshots, err
}

func (r *SnapshotRepository) GetByGroupList(metric string, groups []string) ([]models.SnapshotDB, error) {
	var result []models.SnapshotDB
	err := r.db.Where("id IN (?)", r.db.Table("snapshot_dbs").
    	Select("snapshot_dbs.id").
    	Joins("JOIN snapshot_group_dbs ON snapshot_dbs.id = snapshot_group_dbs.snapshot_db_id").
    	Joins("JOIN snapshot_param_dbs ON snapshot_dbs.id = snapshot_param_dbs.snapshot_db_id").
    	Where("snapshot_group_dbs.name IN (?)", groups).
		Where("snapshot_dbs.metric = ?", metric).
		Where("snapshot_dbs.error IS NULL OR snapshot_dbs.error = ''").
		Where("snapshot_dbs.outdated_at IS NULL").
    	Group("snapshot_dbs.id").
    	Having("COUNT(DISTINCT snapshot_group_dbs.name) = ?", len(groups))).  
    	Preload("Groups").
		Preload("Params").
		Order("updated_at DESC"). 
    	Find(&result).Error; 

	return result, err
}

func (r *SnapshotRepository) OutdateByIdList(ids []uint) error {
	err := r.db.Model(&models.SnapshotDB{}).Where("id IN (?)", ids).Update("outdated_at", time.Now()).Error

	return err
}

func (r *SnapshotRepository) GetLastestUpdated(metric string, groups []string) (models.SnapshotDB, error) {
	fmt.Println(metric)
	fmt.Println(groups)
	var result models.SnapshotDB
	err := r.db.Where("id IN (?)", r.db.Table("snapshot_dbs").
    	Select("snapshot_dbs.id").
    	Joins("JOIN snapshot_group_dbs ON snapshot_dbs.id = snapshot_group_dbs.snapshot_db_id").
    	Where("snapshot_group_dbs.name IN (?)", groups).
		Where("snapshot_dbs.metric = ?", metric).
		Where("snapshot_dbs.error IS NULL OR snapshot_dbs.error = ''").
    	Group("snapshot_dbs.id").
    	Having("COUNT(DISTINCT snapshot_group_dbs.name) = ?", len(groups))).   // Should have all of the groups provided
    	Preload("Groups").
		Order("updated_at DESC").  // Should only return the latest row
		Limit(1).	// Should only return one row
    	Find(&result).Error; 

	return result, err
}