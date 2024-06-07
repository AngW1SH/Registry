import { PlatformName } from '../platform/platform.entity';
import {
  Resource,
  ResourceCreate,
  ResourceDTO,
  ResourceDetailed,
  ResourceDetailedDTO,
  ResourceWithMetrics,
} from './resource.entity';

export const resourceMocks: Resource[] = [
  {
    id: '1',
    name: 'test',
    platform: PlatformName.GitHub,
    project: '1',
    params: JSON.stringify({}),
  },
  {
    id: '2',
    name: 'test 2',
    platform: PlatformName.GitHub,
    project: '1',
    params: JSON.stringify({}),
  },
];

export const resourceDTOMocks: ResourceDTO[] = resourceMocks.map(
  (resource) => ({
    ...resource,
    params: JSON.parse(resource.params),
  }),
);

export const resourceDetailedMocks: ResourceDetailed[] = resourceMocks.map(
  (resource) => ({
    ...resource,
    metrics: [],
  }),
);

export const resourceDetailedDTOMocks: ResourceDetailedDTO[] =
  resourceDetailedMocks.map((resource) => ({
    ...resource,
    params: JSON.parse(resource.params),
    metrics: [],
  }));

export const resourceDetailedWithSnapshotsMocks = resourceDetailedMocks.map(
  (resource) => ({
    ...resource,
    metrics: [],
  }),
);

export const resourceDetailedWithSnapshotsDTOMocks =
  resourceDetailedWithSnapshotsMocks.map((resource) => ({
    ...resource,
    params: JSON.parse(resource.params),
    metrics: [],
  }));

export const resourceCreateMocks: ResourceCreate[] = resourceMocks.map(
  (resource) => ({
    name: resource.name,
    platform: resource.platform,
    project: resource.project,
  }),
);

export const resourceCreateDTOMocks: ResourceCreate[] = resourceCreateMocks;

export const resourceWithMetricsMocks: ResourceWithMetrics[] =
  resourceMocks.map((resource) => ({
    ...resource,
    metrics: [],
  }));

export const resourcePrismaMocks = resourceMocks.map((resource) => ({
  id: resource.id,
  name: resource.name,
  projectId: resource.project,
  project: {
    id: resource.project,
  },
  params: resource.params,
  platform: resource.platform,
  metrics: [],
  grade: '5',
}));
