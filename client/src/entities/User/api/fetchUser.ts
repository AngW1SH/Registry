import { authorizedFetch } from "@/shared/utils";
import { IUser } from "../types/types";

export const fetchUser = async () => {
  const user: IUser | null = await authorizedFetch("/api/user").then((data) => {
    if (!data.ok) return null;

    return data.json();
  });

  return user;
};
