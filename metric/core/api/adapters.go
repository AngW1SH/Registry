package api

import (
	"core/models"
	"time"

	durationpb "google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func FromGRPCTaskStartInfo(dto *TaskStartInfo) *models.TaskCreate {

	createdAt := time.Time{}
	if dto.CreatedAt != nil {
		createdAt = dto.CreatedAt.AsTime()
	}

	deletedAt := time.Time{}
	if dto.DeletedAt != nil {
		deletedAt = dto.DeletedAt.AsTime()
	}

	return &models.TaskCreate{
		Metric:     dto.Metric,
		UpdatedAt:  time.Now(),
		UpdateRate: dto.UpdateRate.AsDuration(),
		Weight:     int(dto.Weight),
		Data:       dto.Data,
		Groups:     dto.Groups,
		IsPublic:   dto.IsPublic,
		CreatedAt:  createdAt,
		DeletedAt:  deletedAt,
	}
}

func ToGRPCTaskInfo(dto *models.Task) *TaskInfo {
	return &TaskInfo{
		Id:         dto.Id.String(),
		Metric:     dto.Metric,
		UpdateRate: durationpb.New(dto.UpdateRate),
		Weight:     int32(dto.Weight),
		Data:       dto.Data,
		Groups:     dto.Groups,
		IsPublic:   dto.IsPublic,
		CreatedAt:  timestamppb.New(dto.CreatedAt),
		DeletedAt:  timestamppb.New(dto.DeletedAt),
	}
}

func ToGRPCSnapshotInfo(dto *models.SnapshotDB) *SnapshotInfo {

	groups := []string{}

	for i := 0; i < len(dto.Groups); i++ {
		groups = append(groups, dto.Groups[i].Name)
	}

	return &SnapshotInfo{
		Metric:     dto.Metric,
		Data:       dto.Data,
		Groups:     groups,
		Error:      dto.Error,
		Timestamp:  timestamppb.New(dto.CreatedAt),
	}
}