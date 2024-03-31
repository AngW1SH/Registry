package structures

import (
	"core/helpers"
	"core/models"
	"errors"
	"sync"

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
		if helpers.ContainsAllElements(t.Groups, groups) && !t.IsDeleted {
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

			if task.IsDeleted {
				return nil, errors.New("task is already deleted")
			}

			task.IsDeleted = true

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
		if t.Metric == task.Metric && helpers.ContainsAllElements(task.Groups, t.Groups) && !t.IsDeleted {
			
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