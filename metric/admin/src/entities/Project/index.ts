import type { IProject, ProjectFilters } from "./types";
import { projectSlice } from "./model/projectSlice";
import { projectListSlice } from "./model/projectListSlice";
import ProjectCard from "./ui/ProjectCard";

export type { IProject, ProjectFilters };
export { projectSlice, projectListSlice, ProjectCard };
