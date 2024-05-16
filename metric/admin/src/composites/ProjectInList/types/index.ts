import { PlatformName } from "@/entities/Platform/types";
import { IProject } from "@/entities/Project";

export interface ProjectInList extends IProject {
  platforms: PlatformName[];
  grade: string;
}

export interface ProjectFilters {
  text: string;
}
