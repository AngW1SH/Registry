import { IMember } from "@/entities/Member";
import { IProject } from "@/entities/Project";
import { ITeam } from "@/entities/Team";
import { IUser } from "@/entities/User";
import { NamedFile } from "@/shared/types";

export interface UserProject extends IProject {
  resultFiles: NamedFile[];
  documents: {
    id: number;
    name: string;
    date: string;
    url: string;
    type: string;
    size: string;
    category: string;
  }[];
  links: {
    id: number;
    platform: string;
    link: string;
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
