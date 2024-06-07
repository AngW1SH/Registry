import { PlatformName } from '../platform/platform.entity';
import {
  resourceDetailedDTOMocks,
  resourceDetailedMocks,
  resourceDetailedWithSnapshotsDTOMocks,
  resourceDetailedWithSnapshotsMocks,
} from '../resource/resource.mock';
import {
  Project,
  ProjectCreate,
  ProjectDTO,
  ProjectDetailed,
  ProjectDetailedWithSnapshots,
  ProjectInList,
} from './project.entity';

export const projectMocks: Project[] = [
  {
    id: '1',
    name: 'Project 1',
    description: 'Project 1 description',
    dateStart: new Date(),
    dateEnd: new Date(),
  },
  {
    id: '2',
    name: 'Project 2',
    description: 'Project 2 description',
    dateStart: new Date(),
    dateEnd: new Date(),
  },
];

export const projectInListMocks: ProjectInList[] = projectMocks.map(
  (project) => ({
    ...project,
    grade: '5.0',
    platforms: [PlatformName.GitHub],
  }),
);

export const projectDTOMocks: ProjectDTO[] = projectMocks;

export const projectDetailedMocks: ProjectDetailed[] = projectMocks.map(
  (project) => ({
    ...project,
    resources: resourceDetailedMocks,
  }),
);
export const projectDetailedDTOMocks = projectDetailedMocks.map((project) => ({
  ...project,
  resources: resourceDetailedDTOMocks,
}));

export const projectDetailedWithSnapshotsMocks: ProjectDetailedWithSnapshots[] =
  projectDetailedMocks.map((project) => ({
    ...project,
    resources: resourceDetailedWithSnapshotsMocks,
    users: [],
  }));
export const projectDetailedWithSnapshotsDTOMocks =
  projectDetailedWithSnapshotsMocks.map((project) => ({
    ...project,
    resources: resourceDetailedWithSnapshotsDTOMocks,
  }));

export const projectCreateMocks: ProjectCreate[] = [
  {
    name: 'Project 1',
  },
];

export const projectCreateDTOMocks = projectCreateMocks;
