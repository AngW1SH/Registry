import { Long } from '@grpc/proto-loader';

export interface SnapshotGRPC {
  Metric: string;
  Data: string;
  Error: string | null;
  Groups: string[];
  Timestamp: {
    seconds: Long;
    nanos: number;
  };
}

export interface Snapshot {
  metric: string;
  data: string;
  error: string | null;
  groups: string[];
  timestamp: number; // milliseconds
}
