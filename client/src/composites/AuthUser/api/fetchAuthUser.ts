import { authorizedFetch } from "@/shared/utils";
import { AuthUser } from "../types/types";

export const fetchAuthUser = async () => {
  const user: AuthUser | null = await authorizedFetch("/api/user/data").then(
    (data) => {
      if (!data.ok) return null;

      return data.json();
    },
  );

  return user;
};
