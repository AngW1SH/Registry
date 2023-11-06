import { IMember } from "@/entities/Member";
import { IProject } from "@/entities/Project";
import { ITeam } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface UserProject extends IProject {
  resultFiles: {
    id: number;
    name: string;
    date: string;
    url: string;
    type: string;
    size: string;
  }[];
}

export interface ProjectInspect {
  project: UserProject;
  team: ITeam;
  members: IMember[];
  users: IUser[];
}

export interface ProjectInspectList {
  projects: UserProject[];
  teams: ITeam[];
  members: IMember[];
  users: IUser[];
}
