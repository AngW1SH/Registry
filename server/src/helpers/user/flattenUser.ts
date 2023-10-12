import { User, UserStrapi, UserStrapiInner } from "@/entities/user/types/types";

export const flattenUser = (user: UserStrapiInner): User => {
  return {
    id: user.id,
    ...user.attributes,
  };
};
