import { Snapshot } from '../snapshot/snapshot.entity';
import { Data } from './metric-gateway.entity';

export const snapshotMocks: Snapshot[] = [
  {
    groups: ['resource:resource-name-1', 'project:project-name-1'],
    metric: 'metric-1',
    data: '{ "key": "value-1" }',
    timestamp: 123,
    error: '',
  },
  {
    groups: ['resource:resource-name-2', 'project:project-name-2'],
    metric: 'metric-3',
    data: '{ "key": "value-2" }',
    timestamp: 123,
    error: '',
  },
  {
    groups: ['resource:resource-name-1', 'project:project-name-1'],
    metric: 'metric-2',
    data: '{ "key": "value-3" }',
    timestamp: 123,
    error: '',
  },
];

export const dataMocks: Data[] = [
  {
    resource: 'resource-id-1',
    project: 'project-id-1',
    metric: 'metric-id-1',
    error: '',
    data: {
      key: 'value-1',
    },
    timestamp: 123,
  },
  {
    resource: 'resource-id-2',
    project: 'project-id-2',
    metric: 'metric-id-3',
    error: '',
    data: {
      key: 'value-2',
    },
    timestamp: 123,
  },
  {
    resource: 'resource-id-1',
    project: 'project-id-1',
    metric: 'metric-id-2',
    error: '',
    data: {
      key: 'value-3',
    },
    timestamp: 123,
  },
];

export const resourceMocks = [
  {
    id: 'resource-id-1',
    name: 'resource-name-1',
    project: {
      id: 'project-id-1',
    },
    metrics: [
      {
        id: 'metric-id-1',
        metric: {
          name: 'metric-1',
        },
      },
      {
        id: 'metric-id-2',
        metric: {
          name: 'metric-2',
        },
      },
    ],
  },
  {
    id: 'resource-id-2',
    name: 'resource-name-2',
    project: {
      id: 'project-id-2',
    },
    metrics: [
      {
        id: 'metric-id-3',
        metric: {
          name: 'metric-3',
        },
      },
    ],
  },
];
