import { IMetricParam } from "./params";

export interface IAbstractMetric {
  id: string;
  name: MetricName;
}

export interface IMetric extends IAbstractMetric {
  resource: string;
  params: IMetricParam[];
  data: { error: string; data: string }[]; // Snapshots
  isTracked: boolean | null;
}

export enum MetricName {
  CommitsPerDay = "CommitsPerDay",
}
