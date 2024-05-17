package helpers

import "core/models"

func CopyTask(task *models.Task) *models.Task {
	return &models.Task{
		Id:          task.Id,
		Metric:      task.Metric,
		Data:        task.Data,
		UpdatedAt:   task.UpdatedAt,
		Groups:      task.Groups,
		AttemptedAt: task.AttemptedAt,
		UpdateRate:  task.UpdateRate,
		Weight:      task.Weight,
		IsPublic:    task.IsPublic,
		CreatedAt:   task.CreatedAt,
		DeletedAt:   task.DeletedAt,
	}
}