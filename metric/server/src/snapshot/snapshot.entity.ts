export interface SnapshotGRPC {
  Metric: string;
  Data: string;
  Error: string | null;
  Groups: string[];
}

export interface Snapshot {
  metric: string;
  data: string;
  error: string | null;
  groups: string[];
}
