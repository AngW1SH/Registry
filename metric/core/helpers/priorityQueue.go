package helpers

import (
	"core/models"
	"sync"
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

func (pq *PriorityQueue) Peek() *models.Task {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    if len(pq.Entries) == 0 {
        return nil
    }
    return pq.Entries[0]
}