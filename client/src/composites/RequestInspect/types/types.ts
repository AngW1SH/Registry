import { IMember } from "@/entities/Member";
import { IProject } from "@/entities/Project";
import { IRequest } from "@/entities/Request";
import { ITeam } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface RequestInspect {
  request: IRequest;
  teams: ITeam[];
  members: IMember[];
  users: IUser[];
  projects: IProject[];
}

export interface RequestInspectList {
  requests: IRequest[];
  teams: ITeam[];
  projects: IProject[];
  members: IMember[];
  users: IUser[];
}
