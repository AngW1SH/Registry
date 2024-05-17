package structures

import (
	"core/helpers"
	"core/models"
	"errors"
	"sync"
	"time"

	"github.com/google/uuid"
)

type TaskMap struct {
	tasks map[uuid.UUID]*models.Task
	mu    sync.Mutex
}

func NewTaskMap() *TaskMap {
	return &TaskMap{tasks: make(map[uuid.UUID]*models.Task)}
}

func (m *TaskMap) AddTask(task *models.Task) error {
	m.mu.Lock()
	defer m.mu.Unlock()

	if task == nil {
		return errors.New("task cannot be nil")
	}

	if task.Id == uuid.Nil {
		return errors.New("task id cannot be nil")
	}

	m.tasks[task.Id] = task

	return nil
}

func (m *TaskMap) GetTask(id uuid.UUID) *models.Task {
	m.mu.Lock()
	defer m.mu.Unlock()

	result := m.tasks[id]

	if result == nil {
		return nil
	}

	return result
}

func (m *TaskMap) GetByGroups(groups []string) []*models.Task {
	m.mu.Lock()
	defer m.mu.Unlock()

	var result []*models.Task
	for _, t := range m.tasks {
		if helpers.ContainsAllElements(t.Groups, groups) && (t.DeletedAt.IsZero() || t.DeletedAt.After(time.Now())) {
			result = append(result, t)
		}
	}

	return result
}

func (m *TaskMap) MarkDelete(metric string, groups []string) (*models.Task, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	for _, task := range m.tasks {
		if task.Metric == metric && helpers.ContainsAllElements(task.Groups, groups) {

			if !task.DeletedAt.IsZero() && task.DeletedAt.Before(time.Now()) {
				return nil, errors.New("task is already deleted")
			}

			task.DeletedAt = time.Now()

			return task, nil
		}
	}

	return nil, errors.New("task not found")
}

func (m *TaskMap) DeleteTask(id uuid.UUID) {
	m.mu.Lock()
	defer m.mu.Unlock()

	delete(m.tasks, id)
}

func (m *TaskMap) UpdateTask(task *models.TaskCreate) (*models.Task, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	for _, t := range m.tasks {
		if t.Metric == task.Metric && helpers.ContainsAllElements(task.Groups, t.Groups) && (t.DeletedAt.IsZero() || t.DeletedAt.After(time.Now())) {
			
			if task.UpdateRate != 0 {
				t.UpdateRate = task.UpdateRate
			}

			if task.Weight != 0 {
				t.Weight = task.Weight
			}
			
			if task.Data != "" {
				t.Data = task.Data
			}

			return t, nil
		}
	}

	return nil, errors.New("task not found")
}

func (m *TaskMap) ForceUpdate(metric string, groups []string) (*models.Task, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	for _, task := range m.tasks {
		if task.Metric == metric && helpers.ContainsAllElements(groups, task.Groups) && (task.DeletedAt.IsZero() || task.DeletedAt.After(time.Now())) {
			
			task.AttemptedAt = time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC)
			task.UpdatedAt = time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC)

			return task, nil
		}
	}

	return nil, errors.New("task not found")
}

func (m *TaskMap) UpdateGroupName(old string, new string) []*models.Task {
	m.mu.Lock()
	defer m.mu.Unlock()

	var result []*models.Task

	for _, task := range m.tasks {
		for i := 0; i < len(task.Groups); i++ {
			if task.Groups[i] == old {
				task.Groups[i] = new
				result = append(result, task)
			}
		}
	}

	return result
}

func (m *TaskMap) UpdateByGroupName(group string, createdAt time.Time, deletedAt time.Time) []*models.Task {
	m.mu.Lock()
	defer m.mu.Unlock()

	var result []*models.Task

	for _, task := range m.tasks {
		if helpers.Contains(task.Groups, group) {
			task.CreatedAt = createdAt
			task.DeletedAt = deletedAt
			result = append(result, task)
		}
	}

	return result
}