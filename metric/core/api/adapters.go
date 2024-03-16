package api

import (
	"core/models"

	durationpb "google.golang.org/protobuf/types/known/durationpb"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
)

func FromGRPCTaskStartInfo(dto *TaskStartInfo) *models.TaskCreate {
	return &models.TaskCreate{
		Metric:     dto.Metric,
		UpdatedAt:  dto.UpdatedAt.AsTime(),
		UpdateRate: dto.UpdateRate.AsDuration(),
		Weight:     int(dto.Weight),
		Data:       dto.Data,
	}
}

func ToGRPCTaskInfo(dto *models.Task) *TaskInfo {
	return &TaskInfo{
		Id:         dto.Id.String(),
		Metric:     dto.Metric,
		UpdatedAt:  timestamppb.New(dto.UpdatedAt),
		UpdateRate: durationpb.New(dto.UpdateRate),
		Weight:     int32(dto.Weight),
		Data:       dto.Data,
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
	}
}