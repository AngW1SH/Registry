import { IMember } from "@/entities/Member";
import { IProject } from "@/entities/Project";
import { IRequest } from "@/entities/Request";
import { ITeamExtended } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface TeamInspect {
  team: ITeamExtended;
  projects: IProject[];
  users: IUser[];
  members: IMember[];
  requests: IRequest[];
}

export interface TeamInspectList {
  teams: ITeamExtended[];
  projects: IProject[];
  users: IUser[];
  members: IMember[];
  requests: IRequest[];
}
