import type { ITeam } from "./types/types";
import { getTeamsByTeamIds } from "./model/getTeamsByTeamIds";
import { staticTeams } from "./static/staticTeams";

export type { ITeam };
export { staticTeams, getTeamsByTeamIds };
