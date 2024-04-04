import {
  Metric,
  MetricDTO,
  MetricDetailed,
  MetricDetailedDTO,
  MetricSnapshot,
} from 'src/metric/metric.entity';

export interface Resource {
  id: string;
  name: string;
  platform: string;
  project: string;
  params: string;
}

export interface ResourceDTO {
  id: string;
  name: string;
  platform: string;
  project: string;
  params: {
    [key: string]: any;
  };
}

export interface ResourceDetailedDTO extends ResourceDTO {
  metrics: MetricDetailedDTO[];
}

export interface ResourceWithMetrics extends Resource {
  metrics: Metric[];
}

export interface ResourceDetailed extends Resource {
  metrics: MetricDetailed[];
}

export interface ResourceCreateDTO {
  name: string;
  platform: string;
  project: string;
}

export interface ResourceCreate {
  name: string;
  platform: string;
  project: string;
}

export interface ResourceSnapshots {
  [metric: string]: MetricSnapshot[];
}
