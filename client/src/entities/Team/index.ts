import type { ITeam, ITeamExtended } from "./types/types";
import { getTeamsByTeamIds } from "./model/getTeamsByTeamIds";
import { staticTeams } from "./static/staticTeams";

export type { ITeam, ITeamExtended };
export { staticTeams, getTeamsByTeamIds };
