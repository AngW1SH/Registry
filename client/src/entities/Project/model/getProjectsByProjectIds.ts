import { IProject } from "../types/types";

export const getProjectsByProjectIds = (
  projectIds: number[],
  allProjects: IProject[],
) => {
  return projectIds.map((projectId) => {
    return allProjects.find((project) => project.id == projectId)!;
  });
};
