import { IMember } from "@/entities/Member";
import { IProject } from "@/entities/Project";
import { ITeam } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface ProjectInspect {
  project: IProject;
  team: ITeam;
  members: IMember[];
  users: IUser[];
}

export interface ProjectInspectList {
  projects: IProject[];
  teams: ITeam[];
  members: IMember[];
  users: IUser[];
}
