package helpers

import (
	"core/models"
	"errors"
	"sync"

	"github.com/google/uuid"
)

type PriorityQueue struct {
    Entries []*models.Task
    mu sync.Mutex
}

func (pq *PriorityQueue) Len() int { 
    pq.mu.Lock()
    defer pq.mu.Unlock()

    return len(pq.Entries) 
}

func (pq *PriorityQueue) Less(i, j int) bool {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    return pq.Entries[i].AttemptedAt.Before(pq.Entries[j].AttemptedAt)
}

func (pq *PriorityQueue) Swap(i, j int) {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    pq.Entries[i], pq.Entries[j] = pq.Entries[j], pq.Entries[i]
}

func (pq *PriorityQueue) Push(x interface{}) {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    item := x.(*models.Task)
    pq.Entries = append(pq.Entries, item)
}

// Pop removes the smallest element (by updatedAt) from the priority queue.
func (pq *PriorityQueue) Pop() interface{} {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    old := pq.Entries
    n := len(old)
    item := old[n-1]
    pq.Entries = old[0 : n-1]

    return item
}

func (pq *PriorityQueue) MarkDelete(id uuid.UUID) (*models.Task, error) {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    for i := 0; i < len(pq.Entries); i++ {
		if pq.Entries[i].Id == id {
			pq.Entries[i].IsDeleted = true

			return pq.Entries[i], nil
		}
	}
    
	return nil, errors.New("Task not found")
}

func (pq *PriorityQueue) Peek() *models.Task {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    if len(pq.Entries) == 0 {
        return nil
    }
    return pq.Entries[0]
}