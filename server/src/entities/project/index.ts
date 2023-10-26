import type {
  Project,
  ProjectWithTags,
  ProjectFilters,
  ProjectReference,
} from "./types/types";
import {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
  staticProjectsWithTagsResult,
} from "./static/projectsWithTags";
import { getProjectFromDTO } from "./utils/getProjectFromDTO";
import { getProjectFiltersFromDTO } from "./utils/getProjectFiltersFromDTO";

export {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
  staticProjectsWithTagsResult,
  getProjectFromDTO,
  getProjectFiltersFromDTO,
};
export type { Project, ProjectWithTags, ProjectFilters, ProjectReference };
