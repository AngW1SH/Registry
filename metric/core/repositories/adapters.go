package repositories

import (
	"core/models"
	"fmt"
	"time"

	"github.com/google/uuid"
)

func FromDBTask(dto *models.TaskDB) *models.Task {

	var h, m, s int
	fmt.Sscanf(dto.UpdateRate,"%d:%d:%d",&h,&m,&s)
	dur:=time.Duration(h)*time.Hour+time.Duration(m)*time.Minute+time.Duration(s)*time.Second


	return &models.Task{
		Id:         uuid.Must(uuid.Parse(dto.ID)),
		Metric:     dto.Metric,
		Data:       dto.Data,
		UpdatedAt:  dto.UpdatedAt,
		Groups:     dto.Groups,
		AttemptedAt: dto.UpdatedAt,
		UpdateRate: dur,
		Weight:     int(dto.Weight),
		IsDeleted:  false,
		IsPublic:   dto.IsPublic,
	}
}

func ToDBTask(dto *models.Task) *models.TaskDB {

	if dto == nil {
		return &models.TaskDB{}
	}

	return &models.TaskDB{
		ID: dto.Id.String(),
		Metric:     dto.Metric,
		UpdatedAt:  dto.UpdatedAt,
		UpdateRate: dto.UpdateRate.String(),
		Weight:     int(dto.Weight),
		Data:       dto.Data,
		Groups:     dto.Groups,
		IsPublic:   dto.IsPublic,
	}
}