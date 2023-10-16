import { User } from "@/entities/user";
import { UserStrapi } from "../../types/user";

export const getUserFromStrapiDTO = (user: UserStrapi): User => {
  return {
    id: user.data.id,
    ...user.data.attributes,
  };
};
