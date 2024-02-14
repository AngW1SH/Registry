import { useQuery } from "@tanstack/react-query";
import { ProjectStatusData } from "../types/types";
import { fetchProjectStatusData } from "../api/fetchProjectStatusData";
import { useAuthQuery } from "@/entities/User";

export const useProjectStatusDataQuery = (projectId: string) => {
  const { data: user } = useAuthQuery();

  return useQuery<ProjectStatusData | null>({
    queryKey: ["project-status", projectId, user],
    queryFn: () =>
      user ? Promise.resolve(fetchProjectStatusData(projectId)) : null,
  });
};
