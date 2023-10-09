import { ITag } from "@/entities/Tag";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { fetchProjectDetailed } from "../api/fetchProjectDetailed";
import { ProjectDetailed } from "../types/types";

export default function useProjectDetailedQuery(
  id: number,
  placeholderData: ProjectDetailed,
) {
  return useQuery<ProjectDetailed>({
    queryKey: ["active-projects", id],
    queryFn: () => Promise.resolve(fetchProjectDetailed(id)),
    keepPreviousData: true,
    placeholderData: placeholderData,
    staleTime: 120000,
  });
}
