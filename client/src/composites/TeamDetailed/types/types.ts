import { IProjectReference } from "@/entities/Project";
import { ITeamExtended } from "@/entities/Team";
import { IUserWithRole } from "@/entities/User";

export interface TeamDetailed {
  team: ITeamExtended;
  project: IProjectReference;
  users: IUserWithRole[];
  requests: IProjectReference[];
}
