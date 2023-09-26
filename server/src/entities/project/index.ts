import type { Project, ProjectWithTags, ProjectFilters } from "./types/types";
import {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
} from "./static/projectsWithTags";
import { getProjectFromDTO } from "./utils/getProjectFromDTO";
import { getProjectFiltersFromDTO } from "./utils/getProjectFiltersFromDTO";

export {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
  getProjectFromDTO,
  getProjectFiltersFromDTO,
};
export type { Project, ProjectWithTags, ProjectFilters };
