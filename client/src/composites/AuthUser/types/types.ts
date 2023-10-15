import { ITeam } from "@/entities/Team";
import { IUserWithUnassignedData } from "@/entities/User/types/types";

export interface AuthUser {
  user: IUserWithUnassignedData;
  teams: ITeam[];
}
