import { IProjectSingle, IProjectSingleDTO } from "@/entities/Project";
import { ITag } from "@/entities/Tag";
import { ITeam } from "@/entities/Team";
import { IUserWithRole } from "@/entities/User";

export interface ProjectDetailed {
  project: IProjectSingle;
  tags: ITag[];
  teams: ITeam[] | null;
  users: IUserWithRole[] | null;
}

export interface ProjectDetailedDTO {
  project: IProjectSingleDTO;
  tags: ITag[];
  teams: ITeam[] | null;
  users: IUserWithRole[] | null;
}
