import { IProject, ProjectStage } from "../types/types";

export const getProjectStage = (project: IProject): ProjectStage => {
  if (!project.team) return ProjectStage.hiring;

  if (project.dateEnd < new Date()) return ProjectStage.completed;

  return ProjectStage.active;
};
