import { IProject } from "../types/types";

export const getProjectsByProjectIds = (
  projectIds: string[],
  allProjects: IProject[],
) => {
  return projectIds.map((projectId) => {
    return allProjects.find((project) => project.id == projectId)!;
  });
};
