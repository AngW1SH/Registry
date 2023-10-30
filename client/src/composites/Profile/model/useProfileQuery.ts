import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/fetchProfile";
import { Profile } from "../types/types";
import { useAuthQuery } from "@/entities/User";

export function useProfileQuery() {
  const { data: user } = useAuthQuery();

  return useQuery<Profile | null>({
    queryKey: ["profile", user?.id],
    queryFn: () => (user ? Promise.resolve(fetchProfile()) : null),
    keepPreviousData: true,
    enabled: !!user?.id,
  });
}
