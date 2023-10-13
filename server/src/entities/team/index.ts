import type {
  Team,
  TeamMemberStrapiPopulated,
  TeamStrapiPopulated,
  RequestListStrapi,
} from "./types/types";

import {
  flattenTeam,
  flattenTeamWithAdministrators,
} from "./utils/flattenTeam";

export type {
  Team,
  TeamMemberStrapiPopulated,
  TeamStrapiPopulated,
  RequestListStrapi,
};
export { flattenTeam, flattenTeamWithAdministrators };
