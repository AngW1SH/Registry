package structures

import (
	"container/heap"
	"core/models"
	"sync"
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

func (pq *PriorityQueue) Push(x interface{}) {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    item := x.(*models.Task)
    pq.entries = append(pq.entries, item)
}

func (pq *PriorityQueue) Pop() interface{} {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    old := pq.entries
    n := len(old)
    item := old[n-1]
    pq.entries = old[0 : n-1]

    return item
}

func (pq *PriorityQueue) Peek() *models.Task {
    pq.mu.Lock()
    defer pq.mu.Unlock()

    if len(pq.entries) == 0 {
        return nil
    }
    return pq.entries[0]
}

func (pq *PriorityQueue) Rebuild() {
    heap.Init(pq)
}