import { ITeam } from "../types/types";

export const getTeamsByTeamIds = <T extends ITeam>(
  teamsIds: number[],
  allTeams: T[],
): T[] => {
  return teamsIds.map((teamId) => {
    return allTeams.find((team) => team.id == teamId)!;
  });
};
