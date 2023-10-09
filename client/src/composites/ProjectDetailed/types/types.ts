import { IProject, ProjectDTO } from "@/entities/Project";
import { ITag } from "@/entities/Tag";
import { ITeam } from "@/entities/Team";
import { IUserWithRole } from "@/entities/User";

export interface ProjectDetailed {
  project: IProject;
  tags: ITag[];
  team: ITeam;
  users: IUserWithRole[];
}

export interface ProjectDetailedDTO {
  project: ProjectDTO;
  tags: ITag[];
  team: ITeam;
  users: IUserWithRole[];
}
