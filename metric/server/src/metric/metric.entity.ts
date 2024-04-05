import { MetricNames } from './config/metricNames';

export interface AbstractMetricDTO {
  id: string;
  name: string;
}

export interface AbstractMetric {
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
export interface MetricDetailed extends Metric {
  isTracked?: boolean;
  data: MetricSnapshot[];
}

export interface MetricDetailedDTO extends MetricDTO {
  isTracked?: boolean;
  data: MetricSnapshot[];
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
