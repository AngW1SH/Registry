package api

import (
	context "context"
	"core/repositories"
	"fmt"
	sync "sync"
)

type SnapshotServer struct {
	Repo *repositories.SnapshotRepository
	connections map[string]chan []*SnapshotInfo
	mu     sync.Mutex
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

	if s.connections == nil {
		s.connections = make(map[string]chan []*SnapshotInfo)
	}
	
	fmt.Println("SnapshotStream", request.Id)
	s.mu.Lock()
	s.connections[request.Id] = make(chan []*SnapshotInfo)
	s.mu.Unlock()

	for {
		select {
			case <-stream.Context().Done():
				fmt.Printf("Client %s disconnected\n", request.Id)
				s.mu.Lock()
				delete(s.connections, request.Id)
				s.mu.Unlock()
				return nil
			case snapshots := <-s.connections[request.Id]:
				if err := stream.Send(&SnapshotStreamResult{Snapshots: snapshots}); err != nil {
					fmt.Printf("Failed to send snapshot to client %s: %v\n", request.Id, err)
					s.mu.Lock()
					delete(s.connections, request.Id)
					s.mu.Unlock()
					return err
				}
		}
	}
}

func (s *SnapshotServer) Broadcast() {
	s.mu.Lock()
	s.connections = make(map[string]chan []*SnapshotInfo)
	s.mu.Unlock()
	
	for snapshotBatch := range s.Repo.Stream {
		fmt.Println(s.connections)
		var snapshots []*SnapshotInfo

		for i := 0; i < len(snapshotBatch); i++ {
			snapshots = append(snapshots, ToGRPCSnapshotInfo(snapshotBatch[i]))
		}

		for _, ch := range s.connections {
			ch <- snapshots
		}
	}
}