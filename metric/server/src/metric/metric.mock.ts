import { resourceMocks } from '../resource/resource.mock';
import {
  AbstractMetric,
  AbstractMetricDetailed,
  Metric,
  MetricCreate,
  MetricDTO,
  MetricWithSnapshots,
  MetricWithSnapshotsDTO,
} from './metric.entity';

export const metricMocks: Metric[] = [
  {
    id: '1',
    name: 'TotalCommits',
    params: '[]',
    resource: resourceMocks[0].id,
    isTracked: null,
  },
  {
    id: '2',
    name: 'Commits',
    params: '[]',
    resource: resourceMocks[0].id,
    isTracked: null,
  },
  {
    id: '3',
    name: 'Issues',
    params: '[]',
    resource: resourceMocks[1].id,
    isTracked: null,
  },
];

export const metricDTOMocks: MetricDTO[] = metricMocks.map((metric) => ({
  ...metric,
  params: JSON.parse(metric.params),
  data: null,
}));

export const metricCreateMocks: MetricCreate[] = metricMocks.map((metric) => ({
  name: metric.name,
  resource: metric.resource,
  params: JSON.stringify(metric.params),
  isTracked: metric.isTracked,
}));

export const metricWithSnapshotsMocks: MetricWithSnapshots[] = metricMocks.map(
  (metric) => ({ ...metric, data: [] }),
);

export const metricWithSnapshotsDTOMocks: MetricWithSnapshotsDTO[] =
  metricWithSnapshotsMocks.map((metric) => ({
    ...metric,
    params: JSON.parse(metric.params),
    data: [],
  }));

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
