import { IForm } from "@/entities/Form";
import { IMember } from "@/entities/Member";
import { IProjectReference } from "@/entities/Project";
import { IRequest } from "@/entities/Request";
import { ITeam } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface Profile {
  forms: IForm[];
  projects: IProjectReference[];
  requests: IRequest[];
  teams: ITeam[];
  users: IUser[];
  members: IMember[];
  user: {
    teams: number[];
    administratedTeams: number[];
  };
}
