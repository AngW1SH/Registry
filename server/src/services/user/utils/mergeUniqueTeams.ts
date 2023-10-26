import { getTeamFromStrapiDTO } from "@/db/strapi/adapters/team";
import { TeamStrapiPopulatedInner } from "@/db/strapi/types/team";
import { Team } from "@/entities/team/types/types";

export const mergeUniqueTeams = (
  teamList1: Team[],
  teamList2: Team[]
): Team[] => {
  const result: Team[] = [];

  const usedIds = new Set();

  teamList1.forEach((team) => {
    usedIds.add(team.id);
    result.push(team);
  });

  teamList2.forEach((team) => {
    if (!usedIds.has(team.id)) {
      usedIds.add(team.id);
      result.push(team);
    }
  });

  return result;
};
