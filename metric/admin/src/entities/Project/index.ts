import type { IProject } from "./types";
import { projectSlice } from "./model/projectSlice";
import { projectListSlice } from "./model/projectListSlice";
import ProjectCard from "./ui/ProjectCard";

export type { IProject };
export { projectSlice, projectListSlice, ProjectCard };
