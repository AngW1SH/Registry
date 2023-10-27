import { authorizedFetch } from "@/shared/utils";
import { Profile } from "../types/types";

export const fetchProfile = async () => {
  const result: Profile | null = await authorizedFetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/user/profile",
  ).then((result) => (result.ok ? result.json() : null));

  return result;
};
