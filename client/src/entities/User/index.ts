import type { IUser } from "./types/types";
import { getUsersByUserIds } from "./model/getUsersByUserIds";
import { staticUsers } from "./static/staticUsers";
import { formatNameShort } from "./model/formatNameShort";
import { useAuthQuery } from "./model/useAuthQuery";
import { getFullName } from "./model/getFullName";

export type { IUser };
export {
  getUsersByUserIds,
  getFullName,
  staticUsers,
  formatNameShort,
  useAuthQuery,
};
