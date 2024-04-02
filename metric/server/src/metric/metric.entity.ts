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

export interface MetricWithSnapshots extends Metric {
  data: MetricSnapshot[];
}

export interface MetricWithSnapshotsDTO extends MetricDTO {
  data: MetricSnapshot[];
}

export interface MetricDetailed extends MetricWithSnapshots {
  isTracked: boolean;
}

export interface MetricDetailedDTO extends MetricWithSnapshotsDTO {
  isTracked: boolean;
}

export interface MetricDTO {
  id: string;
  name: string;
  params: {
    [key: string]: any;
  };
  resource: string;
}

export interface Metric {
  id: string;
  name: string;
  params: string;
  resource: string;
}

export type MetricCreate = Omit<Metric, 'id'>;

export enum MetricNames {
  TotalCommits = 'TotalCommits',
  Commits = 'Commits',
  Issues = 'Issues',
  IssueCompleteness = 'IssueCompleteness',
}
