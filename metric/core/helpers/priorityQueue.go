package helpers

import (
	"core/models"
	"errors"
	"sync"

	"github.com/google/uuid"
)

type PriorityQueue struct {
    entries []*models.Task
    mu sync.Mutex
}

func (pq *PriorityQueue) Len() int { 
    pq.mu.Lock()
    defer pq.mu.Unlock()

    return len(pq.entries) 
}

func (pq *PriorityQueue) Less(i, j int) bool {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    return pq.entries[i].AttemptedAt.Before(pq.entries[j].AttemptedAt)
}

func (pq *PriorityQueue) Swap(i, j int) {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    pq.entries[i], pq.entries[j] = pq.entries[j], pq.entries[i]
}

func (pq *PriorityQueue) GetEntries() []*models.Task {
    return pq.entries
}

func (pq *PriorityQueue) Push(x interface{}) {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    item := x.(*models.Task)
    pq.entries = append(pq.entries, item)
}

// Pop removes the smallest element (by updatedAt) from the priority queue.
func (pq *PriorityQueue) Pop() interface{} {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    old := pq.entries
    n := len(old)
    item := old[n-1]
    pq.entries = old[0 : n-1]

    return item
}

func (pq *PriorityQueue) MarkDelete(id uuid.UUID) (*models.Task, error) {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    for i := 0; i < len(pq.entries); i++ {
		if pq.entries[i].Id == id {
			pq.entries[i].IsDeleted = true

			return pq.entries[i], nil
		}
	}
    
	return nil, errors.New("Task not found")
}

func (pq *PriorityQueue) Peek() *models.Task {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    if len(pq.entries) == 0 {
        return nil
    }
    return pq.entries[0]
}