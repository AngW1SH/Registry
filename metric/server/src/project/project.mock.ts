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
} from './project.entity';

export const projectMocks: Project[] = [
  {
    id: '1',
    name: 'Project 1',
  },
  {
    id: '2',
    name: 'Project 2',
  },
];

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
