package main

import (
	"core/api"
	"core/initializers"
	"core/queue"
	"core/repositories"
	"log"
	"net"
	"os"

	"google.golang.org/grpc"
	"gorm.io/gorm"
)

var db *gorm.DB

func init() {
	initializers.InitializeEnvVariables()
	db = initializers.InitializeDB()
}

func main() {

	snapshotRepo := repositories.NewSnapshotRepository(db)
	taskRepo := repositories.NewTaskRepository(db)


	queue := queue.NewQueue(100, snapshotRepo, taskRepo)
	queue.Start()

	lis, err := net.Listen("tcp", ":" + os.Getenv("PORT"))

	if err != nil {
		log.Fatalf("Failed to listen on port %v: %v", os.Getenv("PORT"), err)
	}

	taskServer := api.TaskServer{Queue: queue}
	snapshotServer := api.SnapshotServer{Repo: snapshotRepo}
	grpcServer := grpc.NewServer()
	api.RegisterTaskServiceServer(grpcServer, &taskServer)
	api.RegisterSnapshotServiceServer(grpcServer, &snapshotServer)

	go snapshotServer.Broadcast()

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to server gRPC server over port %v: %v", os.Getenv("PORT"), err)
	}
}