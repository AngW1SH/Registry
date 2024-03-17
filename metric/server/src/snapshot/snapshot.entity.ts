export interface SnapshotGRPC {
  Metric: string;
  Data: string;
  Groups: string[];
}

export interface Snapshot {
  metric: string;
  data: string;
  groups: string[];
}
