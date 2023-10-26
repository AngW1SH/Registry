import type { IUser, IUserWithUnassignedData } from "./types/types";
import { getUsersByUserIds } from "./model/getUsersByUserIds";
import { staticUsers, staticUsersWithRoles } from "./static/staticUsers";
import { formatNameShort } from "./model/formatNameShort";

export type { IUser };
export {
  getUsersByUserIds,
  staticUsers,
  staticUsersWithRoles,
  formatNameShort,
};
