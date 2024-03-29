import { timestampToMilliseconds } from 'utils/timestamp';
import { Snapshot, SnapshotGRPC } from '../snapshot.entity';

export const fromGRPC = (snapshot: SnapshotGRPC): Snapshot => {
  return {
    metric: snapshot.Metric,
    data: snapshot.Data,
    groups: snapshot.Groups,
    error: snapshot.Error,
    timestamp: timestampToMilliseconds(snapshot.Timestamp),
  };
};
