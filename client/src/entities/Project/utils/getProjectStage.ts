import { IProject, ProjectStage } from "../types/types";
import { getProjectHiringSlotCount } from "./getProjectHiringSlotCount";

export const getProjectStage = (project: IProject): ProjectStage => {
  if (project.dateEnd < new Date()) return ProjectStage.completed;

  if (getProjectHiringSlotCount(project) > 0) return ProjectStage.hiring;

  return ProjectStage.active;
};
