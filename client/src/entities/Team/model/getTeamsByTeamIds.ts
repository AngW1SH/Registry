import { ITeam } from "../types/types";

export const getTeamsByTeamIds = (teamsIds: number[], allTeams: ITeam[]) => {
  return teamsIds.map((teamId) => {
    return allTeams.find((team) => team.id == teamId)!;
  });
};
