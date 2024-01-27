package helpers

import "core/models"

type PriorityQueue []models.Task

func (pq PriorityQueue) Len() int { return len(pq) }

func (pq PriorityQueue) Less(i, j int) bool {
    return pq[i].UpdatedAt.Before(pq[j].UpdatedAt)
}

func (pq PriorityQueue) Swap(i, j int) {
    pq[i], pq[j] = pq[j], pq[i]
}

func (pq *PriorityQueue) Push(x interface{}) {
    item := *x.(*models.Task)
    *pq = append(*pq, item)
}

// Pop removes the smallest element (by updatedAt) from the priority queue.
func (pq *PriorityQueue) Pop() interface{} {
    old := *pq
    n := len(old)
    item := old[n-1]
    *pq = old[0 : n-1]
    return item
}

func (pq PriorityQueue) Peek() *models.Task {
    if pq.Len() == 0 {
        return nil
    }
    return &pq[0]
}