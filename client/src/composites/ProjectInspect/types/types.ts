import { IProject } from "@/entities/Project";
import { ITeam } from "@/entities/Team";

export interface ProjectInspect {
  project: IProject;
  team: ITeam;
}

export interface ProjectInspectList {
  projects: IProject[];
  teams: ITeam[];
}
