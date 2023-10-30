import { IProject } from "@/entities/Project";
import { IRequest } from "@/entities/Request";
import { ITeam } from "@/entities/Team";

export interface RequestInspect {
  request: IRequest;
  team: ITeam;
  project: IProject;
}

export interface RequestInspectList {
  requests: IRequest[];
  teams: ITeam[];
  projects: IProject;
}
