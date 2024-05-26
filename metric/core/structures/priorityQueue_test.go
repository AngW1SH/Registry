package structures

import (
	"container/heap"
	"core/models"
	"testing"
	"time"
)

func TestPriorityQueue_Len(t *testing.T) {

	pq := PriorityQueue{}

	if pq.Len() != 0 {
		t.Fail()
	}

	pq.Push(&models.Task{})

	if pq.Len() != 1 {
		t.Fail()
	}

	pq.Push(&models.Task{})

	if pq.Len() != 2 {
		t.Fail()
	}

	pq.Pop()

	if pq.Len() != 1 {
		t.Fail()
	}
}

func TestPriorityQueue_Less(t *testing.T) {

	pq := PriorityQueue{}

	pq.Push(&models.Task{
		AttemptedAt: time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC),
	})

	pq.Push(&models.Task{
		AttemptedAt: time.Date(1970, time.January, 2, 0, 0, 0, 0, time.UTC),
	})

	if !pq.Less(0, 1) {
		t.Fail()
	}
}

func TestPriorityQueue_Swap(t *testing.T) {

	pq := PriorityQueue{}

	pq.Push(&models.Task{
		AttemptedAt: time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC),
	})

	pq.Push(&models.Task{
		AttemptedAt: time.Date(1970, time.January, 2, 0, 0, 0, 0, time.UTC),
	})

	pq.Swap(0, 1)

	if pq.entries[0].AttemptedAt != time.Date(1970, time.January, 2, 0, 0, 0, 0, time.UTC) {
		t.Fail()
	}
}

func TestPriorityQueue_Push(t *testing.T) {

	pq := PriorityQueue{}

	pq.Push(&models.Task{
		AttemptedAt: time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC),
	})

	if pq.Len() != 1 {
		t.Fail()
	}

	pq.Push(&models.Task{
		AttemptedAt: time.Date(1970, time.January, 2, 0, 0, 0, 0, time.UTC),
	})

	if pq.Len() != 2 {
		t.Fail()
	}
}

func TestPriorityQueue_Pop(t *testing.T) {

	pq := PriorityQueue{}

	heap.Push(&pq, &models.Task{
		AttemptedAt: time.Date(1970, time.January, 2, 0, 0, 0, 0, time.UTC),
	})

	heap.Push(&pq, &models.Task{
		AttemptedAt: time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC),
	})

	popped := heap.Pop(&pq).(*models.Task)

	if popped.AttemptedAt != time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC) {
		t.Fail()
	}
}

func TestPriorityQueue_Peek(t *testing.T) {

	pq := PriorityQueue{}

	if pq.Peek() != nil {
		t.Fail()
	}

	heap.Push(&pq, &models.Task{
		AttemptedAt: time.Date(1970, time.January, 2, 0, 0, 0, 0, time.UTC),
	})

	if pq.Peek().AttemptedAt != time.Date(1970, time.January, 2, 0, 0, 0, 0, time.UTC) {
		t.Fail()
	}

	heap.Push(&pq, &models.Task{
		AttemptedAt: time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC),
	})

	if pq.Peek().AttemptedAt != time.Date(1970, time.January, 1, 0, 0, 0, 0, time.UTC) {
		t.Fail()
	}
}