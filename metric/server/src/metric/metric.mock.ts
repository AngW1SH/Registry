import { resourceMocks } from '../resource/resource.mock';
import {
  AbstractMetric,
  AbstractMetricDetailed,
  Metric,
  MetricCreate,
  MetricDTO,
  MetricDetailed,
  MetricDetailedDTO,
} from './metric.entity';

export const metricMocks: Metric[] = [
  {
    id: '1',
    name: 'TotalCommits',
    params: '[]',
    resource: resourceMocks[0].id,
  },
  {
    id: '2',
    name: 'Commits',
    params: '[]',
    resource: resourceMocks[0].id,
  },
  {
    id: '3',
    name: 'Issues',
    params: '[]',
    resource: resourceMocks[1].id,
  },
];

export const metricDTOMocks: MetricDTO[] = metricMocks.map((metric) => ({
  ...metric,
  params: JSON.parse(metric.params),
}));

export const metricCreateMocks: MetricCreate[] = metricMocks.map((metric) => ({
  name: metric.name,
  resource: metric.resource,
  params: JSON.stringify(metric.params),
  snapshotBased: true,
}));

export const metricDetailedMocks: MetricDetailed[] = metricMocks.map(
  (metric) => ({
    ...metric,
    data: [],
    snapshotBased: true,
    isTracked: true,
  }),
);

export const metricDetailedDTOMocks: MetricDetailedDTO[] = metricMocks.map(
  (metric) => ({
    ...metric,
    params: JSON.parse(metric.params),
    data: [],
    isTracked: true,
  }),
);

export const abstractMetricMocks: AbstractMetric[] = [
  {
    name: 'TotalCommits',
  },
  {
    name: 'Commits',
  },
  {
    name: 'Issues',
  },
];

export const AbstractMetricDetailedMocks: AbstractMetricDetailed[] =
  abstractMetricMocks.map((metric) => ({
    ...metric,
    snapshotBased: true,
    dependencies: [],
  }));

export const prismaMetricMocks = metricMocks.map((metric) => ({
  id: metric.id,
  resourceId: metric.resource,
  snapshotBased: true,
  resource: {
    id: metric.resource,
  },
  params: metric.params,
  name: metric.name,
}));
