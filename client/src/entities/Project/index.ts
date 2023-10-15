import ProjectCard from "./ui/ProjectCard";
import ProjectCardAlt from "./ui/ProjectCardAlt";
import { staticProjects } from "./static/staticProjects";
import { getProjectStage } from "./utils/getProjectStage";
import type { ProjectDTO, IProject } from "./types/types";
import { ProjectStage } from "./types/types";

export {
  ProjectCard,
  ProjectCardAlt,
  staticProjects,
  getProjectStage,
  ProjectStage,
};
export type { ProjectDTO, IProject };
