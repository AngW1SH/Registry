export interface AbstractMetricDTO {
  id: string;
  name: string;
}

export interface AbstractMetric {
  id: string;
  name: string;
}

export interface MetricDTO {
  id: string;
  name: string;
  params: string;
  resource: string;
  data: string[];
}

export interface Metric {
  id: string;
  name: string;
  params: string;
  resource: string;
  data: string[];
}
