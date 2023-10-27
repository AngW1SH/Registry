import type { IUser } from "./types/types";
import { getUsersByUserIds } from "./model/getUsersByUserIds";
import { staticUsers, staticUsersWithRoles } from "./static/staticUsers";
import { formatNameShort } from "./model/formatNameShort";
import { useAuthQuery } from "./model/useAuthQuery";

export type { IUser };
export {
  getUsersByUserIds,
  staticUsers,
  staticUsersWithRoles,
  formatNameShort,
  useAuthQuery,
};
