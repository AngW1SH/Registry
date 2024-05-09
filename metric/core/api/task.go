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
	fmt.Println("Start Request | ", message.Task.Metric, " | ", message.Task.Groups)

	fmt.Println(message.Task.UpdateRate)

	task := s.Queue.AddTask(FromGRPCTaskStartInfo(message.Task))

	if task == nil {
		return &TaskStartResponse{Task: &TaskInfo{}}, nil
	}

	return &TaskStartResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *TaskServer) Stop(ctx context.Context, message *TaskStopRequest) (*TaskStopResponse, error) {
	fmt.Println("Stop Request ", message.Metric, " | ", message.Groups)

	task, err := s.Queue.DeleteTask(message.Metric, message.Groups, message.DeleteSnapshots)

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
	fmt.Println("Update Request | ", message.Task.Metric, " | ", message.Task.Groups)

	task, err := s.Queue.UpdateTask(FromGRPCTaskStartInfo(message.Task))

	if err != nil {
		return &TaskStartResponse{Task: &TaskInfo{}}, err
	}

	return &TaskStartResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *TaskServer) List(ctx context.Context, message *TaskListRequest) (*TaskListResponse, error) {
	fmt.Println("List Request | ", message.Groups)

	tasks := s.Queue.ListTasks(message.Groups)

	result := []*TaskInfo{}

	for i := 0; i < len(tasks); i++ {
		result = append(result, ToGRPCTaskInfo(tasks[i]))
	}

	return &TaskListResponse{Tasks: result}, nil
}

func (s *TaskServer) ForceExecute(ctx context.Context, message *TaskForceExecuteRequest) (*TaskForceExecuteResponse, error) {
	fmt.Println("ForceExecute Request | ", message.Task , " | ", message.Groups)

	task, err := s.Queue.ForceExecute(FromGRPCTaskStartInfo(message.Task), message.Groups)

	if err != nil {
		return &TaskForceExecuteResponse{Task: &TaskInfo{}}, err
	}

	return &TaskForceExecuteResponse{Task: ToGRPCTaskInfo(task)}, nil
}

func (s *TaskServer) UpdateGroupName(ctx context.Context, message *UpdateGroupNameRequest) (*UpdateGroupNameResult, error) {
	fmt.Println("UpdateGroupName | ", message.Old, " | ", message.New)

	err := s.Queue.UpdateGroupName(message.Old, message.New)

	if err != nil {
		return &UpdateGroupNameResult{Old: "", New: ""}, err
	}

	return &UpdateGroupNameResult{Old: message.Old, New: message.New}, nil
}