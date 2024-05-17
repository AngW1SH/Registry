package structures

import (
	"core/models"
	"testing"
	"time"

	"github.com/google/uuid"
)

func TestTaskMap_AddTask(t *testing.T) {

	t.Run("Success", func(t *testing.T) {

		taskMap := NewTaskMap()

		id := uuid.New()
		taskCorrect := models.Task{
			Id: id,
		}
	
		err := taskMap.AddTask(&taskCorrect)
	
		if err != nil {
			t.Fail()
		}
	})

	t.Run("Id is nil", func(t *testing.T) {

		taskMap := NewTaskMap()

		taskWithoutId := models.Task{}

		err := taskMap.AddTask(&taskWithoutId)

		if err == nil {
			t.Fail()
		}
	})

	t.Run("Task is nil", func(t *testing.T) {

		taskMap := NewTaskMap()

		err := taskMap.AddTask(nil)

		if err == nil {
			t.Fail()
		}
	})
}

func TestTaskMap_GetTask(t *testing.T) {
	t.Run("Success", func (t *testing.T) {

		taskMap := NewTaskMap()

		task := models.Task{
			Id: uuid.New(),
		}

		taskMap.AddTask(&task)

		result := taskMap.GetTask(task.Id)

		if result == nil {
			t.Fail()
		}
	})

	t.Run("Task not added", func (t *testing.T) {
		
		taskMap := NewTaskMap()

		result := taskMap.GetTask(uuid.New())

		if result != nil {
			t.Fail()
		}
	})
}

func TestTaskMap_GetByGroups(t *testing.T) {

	t.Run("All groups are present", func (t *testing.T) {

		taskMap := NewTaskMap()

		taskAllGroups := models.Task{
			Id: uuid.New(),
			Groups: []string{"group1", "group2"},
		}

		taskMap.AddTask(&taskAllGroups)

		result := taskMap.GetByGroups([]string{"group1", "group2"})

		if len(result) != 1 {
			t.Fail()
		}
	})

	t.Run("Some groups are present", func (t *testing.T) {
		taskMap := NewTaskMap()

		taskAllGroups := models.Task{
			Id: uuid.New(),
			Groups: []string{"group1"},
		}

		taskMap.AddTask(&taskAllGroups)

		result := taskMap.GetByGroups([]string{"group1", "group2"})

		if len(result) != 0 {
			t.Fail()
		}
	})

	t.Run("No groups are present", func (t *testing.T) {
		taskMap := NewTaskMap()

		taskAllGroups := models.Task{
			Id: uuid.New(),
		}

		taskMap.AddTask(&taskAllGroups)

		result := taskMap.GetByGroups([]string{"group1", "group2"})

		if len(result) != 0 {
			t.Fail()
		}
	})

	t.Run("Other groups are present", func (t *testing.T) {
		taskMap := NewTaskMap()

		taskAllGroups := models.Task{
			Id: uuid.New(),
			Groups: []string{"group3"},
		}

		taskMap.AddTask(&taskAllGroups)

		result := taskMap.GetByGroups([]string{"group1", "group2"})

		if len(result) != 0 {
			t.Fail()
		}
	})

	t.Run("More groups are present", func (t *testing.T) {
		taskMap := NewTaskMap()

		taskAllGroups := models.Task{
			Id: uuid.New(),
			Groups: []string{"group1", "group2", "group3"},
		}

		taskMap.AddTask(&taskAllGroups)

		result := taskMap.GetByGroups([]string{"group1", "group2"})

		if len(result) != 1 {
			t.Fail()
		}
	})
}

func TestTaskMap_MarkDelete(t *testing.T) {

	t.Run("Task present", func (t *testing.T) {

		taskMap := NewTaskMap()
	
		task := models.Task{
			Id: uuid.New(),
			Metric: "metric",
			Groups: []string{"group1", "group2"},
		}
	
		taskMap.AddTask(&task)
	
		deleted, err := taskMap.MarkDelete(task.Metric, task.Groups)
	
		if err != nil || deleted == nil || !deleted.DeletedAt.IsZero() {
			t.Fail()
		}
	})

	t.Run("Task not present", func (t *testing.T) {
		taskMap := NewTaskMap()
	
		deleted, err := taskMap.MarkDelete("metric", []string{"group1", "group2"})
	
		if err == nil || deleted != nil {
			t.Fail()
		}
	})

	t.Run("Task already deleted", func (t *testing.T) {
		taskMap := NewTaskMap()
	
		task := models.Task{
			Id: uuid.New(),
			Metric: "metric",
			Groups: []string{"group1", "group2"},
		}
	
		taskMap.AddTask(&task)
	
		deleted, err := taskMap.MarkDelete(task.Metric, task.Groups)
	
		if err != nil || deleted == nil || !deleted.DeletedAt.IsZero() {
			t.Fail()
		}

		deletedAgain, err := taskMap.MarkDelete(task.Metric, task.Groups)

		if err == nil || deletedAgain != nil {
			t.Fail()
		}
	})
}

func TestTaskMap_DeleteTask(t *testing.T) {
	taskMap := NewTaskMap()
	
	task := models.Task{
		Id: uuid.New(),
		Metric: "metric",
		Groups: []string{"group1", "group2"},
	}
	
	taskMap.AddTask(&task)
	
	taskMap.DeleteTask(task.Id)
	
	result := taskMap.GetTask(task.Id)

	if result != nil {
		t.Fail()
	}
}

func TestTaskMap_UpdateTask(t *testing.T) {

	t.Run("Task present", func (t *testing.T) {

		taskMap := NewTaskMap()

		task := models.Task{
			Id: uuid.New(),
			Metric: "metric",
			Groups: []string{"group1", "group2"},
			Weight: 1,
			Data: "test",
			UpdateRate: time.Second,
		}

		taskMap.AddTask(&task)

		result, err := taskMap.UpdateTask(&models.TaskCreate{
			Metric: "metric",
			Groups: []string{"group1", "group2"},
			UpdateRate: time.Minute,
			Weight: 2,
			Data: "test2",
		})

		if err != nil {
			t.Fail()
		}

		if result == nil || result.Weight != 2 || result.Data != "test2" || result.UpdateRate != time.Minute {
			t.Fail()
		}
	})

	t.Run("Task not present", func (t *testing.T)  {
		taskMap := NewTaskMap()

		result, err := taskMap.UpdateTask(&models.TaskCreate{
			Metric: "metric",
			Groups: []string{"group1", "group2"},
			UpdateRate: time.Minute,
			Weight: 2,
			Data: "test2",
		})

		if err == nil || result != nil {
			t.Fail()
		}
	})
}