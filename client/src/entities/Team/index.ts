import type { ITeam, ITeamExtended, IProjectDocument } from "./types/types";
import { getTeamsByTeamIds } from "./model/getTeamsByTeamIds";
import { staticTeams, staticTeamsExtended } from "./static/staticTeams";

export type { ITeam, ITeamExtended, IProjectDocument };
export { staticTeams, staticTeamsExtended, getTeamsByTeamIds };
