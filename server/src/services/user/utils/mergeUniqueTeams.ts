import { getTeamFromStrapiDTO } from "@/db/strapi/adapters/team";
import { TeamStrapiPopulatedInner } from "@/db/strapi/types/team";
import { Team } from "@/entities/team/types/types";

export const mergeUniqueTeams = (
  teamList1: TeamStrapiPopulatedInner[],
  teamList2: TeamStrapiPopulatedInner[]
): Team[] => {
  const result: Team[] = [];

  const usedIds = new Set();

  teamList1.forEach((team) => {
    usedIds.add(team.id);
    result.push(getTeamFromStrapiDTO({ data: team }).team);
  });

  teamList2.forEach((team) => {
    if (!usedIds.has(team.id)) {
      usedIds.add(team.id);
      result.push(getTeamFromStrapiDTO({ data: team }).team);
    }
  });

  return result;
};
