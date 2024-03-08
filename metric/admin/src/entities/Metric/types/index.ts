export interface IAbstractMetric {
  id: string;
  name: MetricName;
}

export interface IMetric extends IAbstractMetric {
  resource: string;
  params: string[];
  data: string[]; // Snapshots
}

export enum MetricName {
  CommitsPerDay = "CommitsPerDay",
}
