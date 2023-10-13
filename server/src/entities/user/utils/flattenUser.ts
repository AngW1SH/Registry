import { User, UserStrapiInner } from "../types/types";

export const flattenUser = (user: UserStrapiInner): User => {
  return {
    id: user.id,
    ...user.attributes,
  };
};
