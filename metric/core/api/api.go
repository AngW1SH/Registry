package api

import (
	"context"
	"fmt"
)

type Server struct {
}

func (s *Server) Start(ctx context.Context, message *TaskStartRequest) (*TaskStartResponse, error) {
	fmt.Println("Start ", message.Task.Metric)

	return &TaskStartResponse{Task: &TaskInfo{}}, nil
}

func (s *Server) Stop(ctx context.Context, message *TaskStopRequest) (*TaskStopResponse, error) {
	fmt.Println("Stop ", message.Id)

	return &TaskStopResponse{Task: &TaskInfo{}}, nil
}