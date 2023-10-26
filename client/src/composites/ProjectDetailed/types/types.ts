import { IMember } from "@/entities/Member";
import { IProjectSingle, IProjectSingleDTO } from "@/entities/Project";
import { ITag } from "@/entities/Tag";
import { ITeam } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface ProjectDetailed {
  project: IProjectSingle;
  tags: ITag[];
  teams: ITeam[] | null;
  users: IUser[] | null;
  members: IMember[] | null;
}

export interface ProjectDetailedDTO {
  project: IProjectSingleDTO;
  tags: ITag[];
  teams: ITeam[] | null;
  users: IUser[] | null;
  members: IMember[] | null;
}
