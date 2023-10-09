import type { IProjectsWithTags } from "./types/types";
import { getProjectsWithTagsFromDTO } from "./model/getProjectsWithTagsFromDTO";
import ProjectsWithTagsList from "./ui/ProjectsWithTagsList";
import ProjectsWithTagsListAlt from "./ui/ProjectsWithTagsListAlt";
import ProjectsWithTagsListLarge from "./ui/ProjectsWithTagsListDetailed";

export type { IProjectsWithTags };
export {
  getProjectsWithTagsFromDTO,
  ProjectsWithTagsList,
  ProjectsWithTagsListAlt,
  ProjectsWithTagsListLarge,
};
