import { Metric, MetricDTO } from 'src/metric/metric.entity';

export interface Resource {
  id: string;
  name: string;
  platform: string;
  project: string;
}

export interface ResourceDTO {
  id: string;
  name: string;
  platform: string;
  project: string;
}

export interface ResourceDetailedDTO extends ResourceDTO {
  metrics: MetricDTO[];
}

export interface ResourceDetailed extends Resource {
  metrics: Metric[];
}
