import type { Project, ProjectWithTags, ProjectFilters } from "./types/types";
import {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
  staticProjectsWithTagsResult,
} from "./static/projectsWithTags";
import { getProjectFromDTO } from "./utils/getProjectFromDTO";
import { getProjectFiltersFromDTO } from "./utils/getProjectFiltersFromDTO";
import { flattenProject, flattenProjects } from "./utils/flattenProject";

export {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
  staticProjectsWithTagsResult,
  getProjectFromDTO,
  getProjectFiltersFromDTO,
  flattenProject,
  flattenProjects,
};
export type { Project, ProjectWithTags, ProjectFilters };
