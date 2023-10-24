import ProjectCard from "./ui/ProjectCard";
import ProjectCardAlt from "./ui/ProjectCardAlt";
import ProjectCardWithStatus from "./ui/ProjectCardWithStatus";
import { staticProjects } from "./static/staticProjects";
import { getProjectStage } from "./utils/getProjectStage";
import {
  getProjectSingleFromDTO,
  getProjectFromDTO,
} from "./utils/getProjectFromDTO/getProjectFromDTO";
import type {
  ProjectDTO,
  IProject,
  IProjectSingle,
  IProjectSingleDTO,
} from "./types/types";
import { ProjectStage } from "./types/types";

export {
  ProjectCard,
  ProjectCardAlt,
  ProjectCardWithStatus,
  staticProjects,
  getProjectStage,
  ProjectStage,
  getProjectFromDTO,
  getProjectSingleFromDTO,
};
export type { ProjectDTO, IProject, IProjectSingle, IProjectSingleDTO };
