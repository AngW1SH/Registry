package main

import (
	"core/api"
	"core/models"
	"core/queue"
	"log"
	"net"
	"time"

	"github.com/google/uuid"
	"google.golang.org/grpc"
)

func init() {
	queue.InitializeQueue(4)
}

func main() {
	id := uuid.New()
	queue.AddTask(models.Task{ Id: id, Metric: "1", Data: []string{ "1-1", "1-2" }, UpdatedAt: time.Date(2024, time.January, 28, 12, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 13, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "1", Data: []string{ "1-3", "1-4" }, UpdatedAt: time.Date(2024, time.January, 28, 14, 0, 0, 0, time.UTC), UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "3", Data: []string{ "3" }, UpdatedAt: time.Date(2024, time.January, 28, 10, 0, 0, 0, time.UTC), Weight: 4, UpdateRate: 20 * time.Second })
	queue.AddTask(models.Task{ Id: uuid.New(), Metric: "2", Data: []string{ "2" }, UpdatedAt: time.Date(2024, time.January, 28, 9, 0, 0, 0, time.UTC), Weight: 1, UpdateRate: 20 * time.Second })
	queue.DeleteTask(id)

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