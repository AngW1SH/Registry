package repositories

import (
	"core/models"
	"errors"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TaskRepository struct {
	db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) *TaskRepository {
	return &TaskRepository{db: db}
}

func (r *TaskRepository) Create(task *models.Task) RepositoryResult {
	
	if task.IsDeleted {
		return RepositoryResult{Error: errors.New("task already deleted")}
	}

	taskDB := ToDBTask(task)
	
	err := r.db.Create(&taskDB).Error

	if err != nil {
		return RepositoryResult{Error: err}
	}

	return RepositoryResult{Result: task}
}

func (r * TaskRepository) Delete(id uuid.UUID) RepositoryResult {
	err := r.db.Delete(&models.TaskDB{ID: id.String()}).Error

	if err != nil {
		return RepositoryResult{Error: err}
	}

	return RepositoryResult{Result: id}
}

func (r *TaskRepository) Update(task *models.Task) (*models.Task, error) {
	err := r.db.Save(ToDBTask(task)).Error

	if err != nil {
		return nil, err
	}

	return task, nil
}

func (r *TaskRepository) GetAll() ([]*models.Task, error) {
	var tasksDB []models.TaskDB

	err := r.db.Find(&tasksDB).Error

	if err != nil {
		return nil, err
	}

	var tasks []*models.Task

	for i := 0; i < len(tasksDB); i++ {
		tasks = append(tasks, FromDBTask(&tasksDB[i]))
	}

	return tasks, nil
}