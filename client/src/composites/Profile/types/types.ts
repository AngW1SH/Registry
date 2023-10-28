import { IForm } from "@/entities/Form";
import { IMember } from "@/entities/Member";
import { IProject, IProjectReference, ProjectDTO } from "@/entities/Project";
import { IRequest } from "@/entities/Request";
import { ITeam, ITeamExtended } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface Profile {
  forms: IForm[];
  projects: IProject[];
  requests: IRequest[];
  teams: ITeamExtended[];
  users: IUser[];
  members: IMember[];
  user: {
    teams: number[];
    administratedTeams: number[];
  };
}

export interface ProfileDTO {
  forms: IForm[];
  projects: ProjectDTO[];
  requests: IRequest[];
  teams: ITeamExtended[];
  users: IUser[];
  members: IMember[];
  user: {
    teams: number[];
    administratedTeams: number[];
  };
}
