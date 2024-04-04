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
}));

export const metricDetailedMocks: MetricDetailed[] = metricMocks.map(
  (metric) => ({
    ...metric,
    data: [],
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
    id: '1',
    name: 'TotalCommits',
  },
  {
    id: '2',
    name: 'Commits',
  },
  {
    id: '3',
    name: 'Issues',
  },
];

export const AbstractMetricDetailedMocks: AbstractMetricDetailed[] =
  abstractMetricMocks.map((metric) => ({
    ...metric,
    dependencies: [],
  }));