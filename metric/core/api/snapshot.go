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

func (s *SnapshotServer) Stream(request *SnapshotStreamRequest, stream SnapshotService_StreamServer) error {
	fmt.Println("SnapshotStream", request.Id)

	for snapshotBatch := range s.Repo.Stream {
		var snapshots []*SnapshotInfo

		for i := 0; i < len(snapshotBatch); i++ {
			snapshots = append(snapshots, ToGRPCSnapshotInfo(snapshotBatch[i]))
		}
		if err := stream.Send(&SnapshotStreamResult{Snapshots: snapshots}); err != nil {
			return err
		}
	}

	return nil
}