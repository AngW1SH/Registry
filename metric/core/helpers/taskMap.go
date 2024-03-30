package helpers

import (
	"core/models"
	"fmt"
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

func (m *TaskMap) AddTask(id uuid.UUID, task *models.Task) {
	m.mu.Lock()
	defer m.mu.Unlock()

	m.tasks[task.Id] = task
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
		if ContainsAllElements(t.Groups, groups) && !t.IsDeleted {
			result = append(result, t)
		}
	}

	return result
}

func (m *TaskMap) MarkDelete(metric string, groups []string) *models.Task {
	m.mu.Lock()
	defer m.mu.Unlock()

	var task *models.Task
	for id, t := range m.tasks {
		if t.Metric == metric && ContainsAllElements(t.Groups, groups) && !t.IsDeleted {
			fmt.Println("Found task to delete with id: ", id)
			m.tasks[id].IsDeleted = true
			task = m.tasks[id]
		}
	}

	return task
}

func (m *TaskMap) DeleteTask(id uuid.UUID) {
	m.mu.Lock()
	defer m.mu.Unlock()

	delete(m.tasks, id)
}

func (m *TaskMap) UpdateTask(task *models.TaskCreate) *models.Task {
	m.mu.Lock()
	defer m.mu.Unlock()
	
	var result *models.Task

	for id, t := range m.tasks {
		if t.Metric == task.Metric && ContainsAllElements(task.Groups, t.Groups) && !t.IsDeleted {
			m.tasks[id].UpdateRate = task.UpdateRate
			m.tasks[id].Weight = task.Weight
			m.tasks[id].Data = task.Data

			result = m.tasks[id]

			break
		}
	}

	return result
}