import type { IUser, IUserWithRole } from "./types/types";
import {
  getUsersByUserIds,
  getUsersWithRolesByUserIds,
} from "./model/getUsersByUserIds";
import { staticUsers, staticUsersWithRoles } from "./static/staticUsers";
import { formatNameShort } from "./model/formatNameShort";

export type { IUser, IUserWithRole };
export {
  getUsersByUserIds,
  getUsersWithRolesByUserIds,
  staticUsers,
  staticUsersWithRoles,
  formatNameShort,
};
