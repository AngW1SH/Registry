package api

import (
	context "context"
	"core/repositories"
	"fmt"
)

type SnapshotServer struct {
	Repo *repositories.SnapshotRepository
	UnimplementedSnapshotServiceServer
}

func (s *SnapshotServer) List(ctx context.Context, message *SnapshotListRequest) (*SnapshotListResult, error) {
	fmt.Println("SnapshotList", message.Group)

	snapshots, err := s.Repo.GetByGroup(message.Group)

	if err != nil {
		return &SnapshotListResult{Snapshots: []*SnapshotInfo{}}, err
	}

	result := []*SnapshotInfo{}

	for i := 0; i < len(snapshots); i++ {
		result = append(result, ToGRPCSnapshotInfo(&snapshots[i]))
	}

	return &SnapshotListResult{Snapshots: result}, nil
}