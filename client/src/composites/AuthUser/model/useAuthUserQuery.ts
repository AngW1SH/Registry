import { useQuery } from "@tanstack/react-query";
import { fetchAuthUser } from "../api/fetchAuthUser";
import { AuthUser } from "../types/types";

export const useAuthUserQuery = () => {
  return useQuery<AuthUser | null>({
    queryKey: ["auth-user"],
    queryFn: () => Promise.resolve(fetchAuthUser()),
    keepPreviousData: true,
    staleTime: 120000,
  });
};
