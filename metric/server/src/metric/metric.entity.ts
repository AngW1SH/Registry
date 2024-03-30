export interface AbstractMetricDTO {
  id: string;
  name: string;
}

export interface AbstractMetric {
  id: string;
  name: string;
}

export interface AbstractMetricDetailed extends AbstractMetric {
  dependencies: MetricNames[];
}

export interface MetricSnapshot {
  error: string;
  data: string;
  timestamp: number;
}

export interface MetricDTO {
  id: string;
  name: string;
  params: {
    [key: string]: any;
  };
  resource: string;
  data: MetricSnapshot[];
}

export interface Metric {
  id: string;
  name: string;
  params: string;
  resource: string;
  isTracked: boolean | null;
}

export type MetricCreate = Omit<Metric, 'id'>;

export interface MetricWithSnapshots extends Metric {
  data: MetricSnapshot[];
}

export interface MetricWithSnapshotsDTO extends MetricDTO {
  data: MetricSnapshot[];
}

export enum MetricNames {
  TotalCommits = 'TotalCommits',
  Commits = 'Commits',
  Issues = 'Issues',
}
