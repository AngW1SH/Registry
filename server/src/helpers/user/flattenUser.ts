import { User, UserStrapi } from "@/entities/user/types/types";

export const flattenUser = (user: UserStrapi): User => {
  return {
    id: user.data.id,
    ...user.data.attributes,
  };
};
