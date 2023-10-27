import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/fetchProfile";
import { Profile } from "../types/types";

export function useProfileQuery() {
  return useQuery<Profile | null>({
    queryKey: ["profile"],
    queryFn: () => Promise.resolve(fetchProfile()),
  });
}
