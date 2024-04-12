package api

import (
	"context"
	"core/queue"
	"fmt"
)

type TaskServer struct {
	Queue *queue.Queue
	UnimplementedTaskServiceServer
}

func (s *TaskServer) Start(ctx context.Context, message *TaskStartRequest) (*TaskStartResponse, error) {
	fmt.Println("Start ", message.Task.Metric)

	fmt.Println(message.Task.UpdateRate)

	task := s.Queue.AddTask(FromGRPCTaskStartInfo(message.Task))

	if task == nil {
		return &TaskStartResponse{Task: &TaskInfo{}}, nil
	}

	return &TaskStartResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *TaskServer) Stop(ctx context.Context, message *TaskStopRequest) (*TaskStopResponse, error) {
	fmt.Println("Stop ", message.Metric)

	task, err := s.Queue.DeleteTask(message.Metric, message.Groups)

	if err != nil {
		fmt.Println(err)
		return &TaskStopResponse{Task: &TaskInfo{}}, nil
	}

	if task == nil {
		return &TaskStopResponse{Task: &TaskInfo{}}, nil
	}

	return &TaskStopResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *TaskServer) Update(ctx context.Context, message *TaskStartRequest) (*TaskStartResponse, error) {
	fmt.Println("Update ", message.Task.Metric)

	task, err := s.Queue.UpdateTask(FromGRPCTaskStartInfo(message.Task))

	if err != nil {
		return &TaskStartResponse{Task: &TaskInfo{}}, err
	}

	return &TaskStartResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *TaskServer) List(ctx context.Context, message *TaskListRequest) (*TaskListResponse, error) {
	fmt.Println("List", message.Groups)

	tasks := s.Queue.ListTasks(message.Groups)

	result := []*TaskInfo{}

	for i := 0; i < len(tasks); i++ {
		result = append(result, ToGRPCTaskInfo(tasks[i]))
	}

	fmt.Println(len(result))

	return &TaskListResponse{Tasks: result}, nil
}

func (s *TaskServer) ForceExecute(ctx context.Context, message *TaskForceExecuteRequest) (*TaskForceExecuteResponse, error) {
	fmt.Println("ForceExecute", message.Groups)

	task, err := s.Queue.ForceExecute(message.Metric, message.Groups)

	if err != nil {
		return &TaskForceExecuteResponse{Task: &TaskInfo{}}, err
	}

	return &TaskForceExecuteResponse{Task: ToGRPCTaskInfo(task)}, nil
}