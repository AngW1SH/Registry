import type { Profile } from "./types/types";
import { useProfileQuery } from "./model/useProfileQuery";
import {
  staticProfileTeamAssigned,
  staticProfileTeamHiring,
} from "./static/staticProfile";

export type { Profile };
export { useProfileQuery, staticProfileTeamAssigned, staticProfileTeamHiring };
