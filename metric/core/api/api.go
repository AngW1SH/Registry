package api

import (
	"context"
	"core/queue"
	"fmt"

	"github.com/google/uuid"
)

type Server struct {
	UnimplementedTaskServiceServer
}

func (s *Server) Start(ctx context.Context, message *TaskStartRequest) (*TaskStartResponse, error) {
	fmt.Println("Start ", message.Task.Metric)

	task := queue.AddTask(FromGRPCTaskStartInfo(message.Task))

	return &TaskStartResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *Server) Stop(ctx context.Context, message *TaskStopRequest) (*TaskStopResponse, error) {
	fmt.Println("Stop ", message.Id)

	parsedId, err := uuid.Parse(message.Id)

	if err != nil {
		return &TaskStopResponse{Task: &TaskInfo{}}, err
	}

	task, err := queue.DeleteTask(parsedId)

	if err != nil {
		return &TaskStopResponse{Task: &TaskInfo{}}, err
	}

	return &TaskStopResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *Server) List(ctx context.Context, message *TaskListRequest) (*TaskListResponse, error) {
	fmt.Println("List")

	tasks, err := queue.ListTasks()

	if err != nil {
		return &TaskListResponse{Tasks: []*TaskInfo{}}, err
	}

	result := []*TaskInfo{}

	for i := 0; i < len(tasks); i++ {
		result = append(result, ToGRPCTaskInfo(tasks[i]))
	}

	return &TaskListResponse{Tasks: result}, nil
}