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
  IProjectReference,
} from "./types/types";
import { ProjectStage } from "./types/types";
import { getProjectsByProjectIds } from "./model/getProjectsByProjectIds";

export {
  ProjectCard,
  ProjectCardAlt,
  ProjectCardWithStatus,
  staticProjects,
  getProjectStage,
  ProjectStage,
  getProjectFromDTO,
  getProjectSingleFromDTO,
  getProjectsByProjectIds,
};
export type {
  ProjectDTO,
  IProject,
  IProjectSingle,
  IProjectSingleDTO,
  IProjectReference,
};
