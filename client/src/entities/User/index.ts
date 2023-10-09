import type { IUser, IUserWithRole } from "./types/types";
import {
  getUsersByUserIds,
  getUsersWithRolesByUserIds,
} from "./model/getUsersByUserIds";

export type { IUser, IUserWithRole };
export { getUsersByUserIds, getUsersWithRolesByUserIds };
