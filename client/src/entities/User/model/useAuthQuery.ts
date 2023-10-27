import { useQuery } from "@tanstack/react-query";
import { IUser } from "../types/types";
import { fetchUser } from "../api/fetchUser";

export const useAuthQuery = () => {
  return useQuery<IUser | null>({
    queryKey: ["auth-user"],
    queryFn: () => Promise.resolve(fetchUser()),
    keepPreviousData: true,
  });
};
