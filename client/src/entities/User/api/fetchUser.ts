import { authorizedFetch } from "@/shared/utils";
import { IUser } from "../types/types";

export const fetchUser = async () => {
  const user: IUser | null = await authorizedFetch("/api/user").then(
    (response) => {
      if (!response.ok) return null;

      try {
        return response.json();
      } catch {
        return null;
      }
    },
  );

  return user;
};
