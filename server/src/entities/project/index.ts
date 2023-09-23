import type { Project, ProjectWithTags } from "./types/types";
import {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
} from "./static/projectsWithTags";
import { getProjectFromDTO } from "./utils/getProjectFromDTO";

export {
  staticProjectsWithTags,
  staticProjectsWithTagsPrisma,
  getProjectFromDTO,
};
export type { Project, ProjectWithTags };
