import { Long } from '@grpc/proto-loader';
import { Snapshot, SnapshotGRPC } from './snapshot.entity';

export const snapshotMocks: Snapshot[] = [
  {
    metric: 'test',
    data: '{ "key": "value-1" }',
    error: null,
    groups: ['project:project-1', 'resource:resource-1'],
    timestamp: 100000,
  },
  {
    metric: 'test',
    data: '{ "key": "value-2" }',
    error: null,
    groups: ['project:project-2', 'resource:resource-2'],
    timestamp: 2000000,
  },
];

export const snapshotGRPCMocks: SnapshotGRPC[] = snapshotMocks.map(
  (snapshot) => ({
    Metric: snapshot.metric,
    Data: snapshot.data,
    Error: snapshot.error,
    Groups: snapshot.groups,
    Timestamp: {
      seconds: new Long(snapshot.timestamp / 1000),
      nanos: 0,
    },
  }),
);
