import { IMember } from "@/entities/Member";
import { IProjectReference } from "@/entities/Project";
import { ITeamExtended } from "@/entities/Team";
import { IUser } from "@/entities/User";

export interface TeamDetailed {
  team: ITeamExtended;
  projects: IProjectReference[];
  users: IUser[];
  members: IMember[];
}

export interface TeamListDetailed {
  teams: ITeamExtended[];
  projects: IProjectReference[];
  users: IUser[];
  members: IMember[];
}
