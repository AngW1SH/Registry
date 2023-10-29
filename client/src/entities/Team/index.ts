import type { ITeam, ITeamExtended } from "./types/types";
import { getTeamsByTeamIds } from "./model/getTeamsByTeamIds";
import { staticTeams, staticTeamsExtended } from "./static/staticTeams";

export type { ITeam, ITeamExtended };
export { staticTeams, staticTeamsExtended, getTeamsByTeamIds };
