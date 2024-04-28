import { PlatformName } from "@/entities/Platform/types";
import { IProject } from "@/entities/Project";

export interface ProjectInList extends IProject {
  platforms: PlatformName[];
}

export interface ProjectFilters {
  text: string;
}
