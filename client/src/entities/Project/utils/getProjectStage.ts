import { IProject, ProjectStage } from "../types/types";

export const getProjectStage = (project: IProject): ProjectStage => {
  if (project.dateEnd < new Date()) return ProjectStage.completed;

  if (!project.team) return ProjectStage.hiring;

  return ProjectStage.active;
};
