import { useQuery } from "@tanstack/react-query";
import { NewRequestsData } from "../types/types";
import { fetchAvailableRequests } from "../api/fetchAvailableRequests";
import { useAuthQuery } from "@/entities/User";

export const useAvailableRequestsQuery = () => {
  const { data: user } = useAuthQuery();

  return useQuery<NewRequestsData | null>({
    queryKey: ["available-requests", user?.id],
    queryFn: () => (user ? Promise.resolve(fetchAvailableRequests()) : null),
    keepPreviousData: true,
  });
};
