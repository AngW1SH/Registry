import { useQuery } from "@tanstack/react-query";
import { ProjectStatusData } from "../types/types";
import { fetchProjectStatusData } from "../api/fetchProjectStatusData";

export const useProjectStatusDataQuery = (projectId: number) => {
  return useQuery<ProjectStatusData>({
    queryKey: ["project-status", projectId],
    queryFn: () => Promise.resolve(fetchProjectStatusData(projectId)),
  });
};
