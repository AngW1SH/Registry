import {
  staticUserResponseStrapi,
  staticUserCreate,
  staticUser,
  staticUserCreateResponseStrapi,
} from "./static/staticUsers";

import { flattenUser } from "./utils/flattenUser";

import type {
  User,
  UserStrapi,
  UserListStrapi,
  UserWithRole,
  UserCreate,
} from "./types/types";

export type { User, UserStrapi, UserCreate, UserListStrapi, UserWithRole };
export {
  staticUserResponseStrapi,
  staticUser,
  staticUserCreate,
  staticUserCreateResponseStrapi,
  flattenUser,
};
