"use client";
import { ITag } from "@/entities/Tag";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Filters } from "@/entities/ProjectFilters";
import { fetchProjects } from "../api/fetchProjects";
import { ProjectsData } from "../types/types";

export default function useActiveProjectsQuery(
  filters: Filters,
  placeholderData: ProjectsData,
) {
  /*
  TODO serialize in particular order for caching to work properly
  */
  const serializeFilters = useCallback((filters: Filters): string => {
    return JSON.stringify(filters);
  }, []);

  return useQuery<ProjectsData>({
    queryKey: ["projects", serializeFilters(filters)],
    queryFn: () => Promise.resolve(fetchProjects(filters)),
    keepPreviousData: true,
    placeholderData: placeholderData,
    staleTime: 120000,
  });
}
