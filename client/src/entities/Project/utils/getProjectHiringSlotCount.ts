import { IProject } from "../types/types";

export const getProjectHiringSlotCount = (project: IProject): number => {
  if (!project.teams) return project.teamLimit;

  return project.teamLimit - project.teams.length;
};
