import { ITeam } from "@/entities/Team";

export interface ProjectStatusData {
  user: {
    assignableTeams: number[]; // administrated by the user and haven't sent a request for this project
    hasTeamApplied: boolean;
  };
  teams: ITeam[];
}
