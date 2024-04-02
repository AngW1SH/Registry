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
    resources: [],
  }),
);
export const projectDetailedDTOMocks = projectDetailedMocks;

export const projectDetailedWithSnapshotsMocks: ProjectDetailedWithSnapshots[] =
  projectDetailedMocks.map((project) => ({
    ...project,
    resources: [],
  }));
export const projectDetailedWithSnapshotsDTOMocks =
  projectDetailedWithSnapshotsMocks;

export const projectCreateMocks: ProjectCreate[] = [
  {
    name: 'Project 1',
  },
];

export const projectCreateDTOMocks = projectCreateMocks;
