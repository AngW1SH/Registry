package main

import (
	"core/api"
	"core/initializers"
	"core/models"
	"core/queue"
	"core/repositories"
	"log"
	"net"
	"time"

	"google.golang.org/grpc"
)

func init() {
	initializers.InitializeEnvVariables()
	initializers.InitializeDB()
	queue.InitializeQueue(4, repositories.NewSnapshotRepository(initializers.DB))
}

func main() {
	task := queue.AddTask(&models.TaskCreate{ Metric: "1", Data: []string{ "1-1", "1-2" }, UpdatedAt: time.Date(2024, time.January, 28, 12, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second })
	queue.AddTask(&models.TaskCreate{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 13, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second })
	queue.AddTask(&models.TaskCreate{ Metric: "1", Data: []string{ "1-3", "1-4" }, UpdatedAt: time.Date(2024, time.January, 28, 14, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second })
	queue.AddTask(&models.TaskCreate{ Metric: "3", Data: []string{ "3" }, UpdatedAt: time.Date(2024, time.January, 28, 10, 0, 0, 0, time.UTC), Weight: 4, UpdateRate: 20 * time.Second })
	queue.AddTask(&models.TaskCreate{ Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 9, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second })
	
	queue.DeleteTask(task.Id)

	lis, err := net.Listen("tcp", ":9000")

	if err != nil {
		log.Fatalf("Failed to listen on port 9000: %v", err)
	}

	s := api.Server{}

	grpcServer := grpc.NewServer()

	api.RegisterTaskServiceServer(grpcServer, &s)

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to server gRPC server over port 9000: %v", err)
	}
}