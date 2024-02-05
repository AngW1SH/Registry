package api

import (
	"context"
	"core/queue"
	"fmt"
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

	return &TaskStopResponse{Task: &TaskInfo{}}, nil
}