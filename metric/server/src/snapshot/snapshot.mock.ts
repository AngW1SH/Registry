import { Snapshot } from './snapshot.entity';

export const snapshotMocks: Snapshot[] = [
  {
    metric: 'test',
    data: '{ "key": "value-1" }',
    error: null,
    groups: ['project:project-1', 'resource:resource-1'],
    timestamp: 1,
  },
  {
    metric: 'test',
    data: '{ "key": "value-2" }',
    error: null,
    groups: ['project:project-2', 'resource:resource-2'],
    timestamp: 2,
  },
];
