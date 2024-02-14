import { ITag } from "@/entities/Tag";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { fetchProjectDetailed } from "../api/fetchProjectDetailed";
import { ProjectDetailed } from "../types/types";

export default function useProjectDetailedQuery(
  id: string,
  placeholderData: ProjectDetailed,
) {
  return useQuery<ProjectDetailed | null>({
    queryKey: ["active-projects", id],
    queryFn: () => Promise.resolve(fetchProjectDetailed(id)),
    keepPreviousData: true,
    placeholderData: placeholderData,
  });
}
