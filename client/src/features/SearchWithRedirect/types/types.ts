import { ProjectStatus } from "../config/initialFilters";

export type Filters = {
  status: ProjectStatusValue | null;
  enrollDate: Date | null;
  projectDate: Date | null;
};

export type ProjectStatusValue =
  (typeof ProjectStatus)[keyof typeof ProjectStatus];
