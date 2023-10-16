"use client";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Filters } from "@/entities/ProjectFilters";
import { fetchProjects } from "../api/fetchProjects";
import { IProjectsWithTags } from "@/composites/ProjectsWithTags";

export default function useProjectsQuery(
  filters: Filters,
  placeholderData: IProjectsWithTags,
) {
  /*
  TODO serialize in particular order for caching to work properly
  */
  const serializeFilters = useCallback((filters: Filters): string => {
    return JSON.stringify(filters);
  }, []);

  return useQuery<IProjectsWithTags>({
    queryKey: ["projects-list", serializeFilters(filters)],
    queryFn: () => Promise.resolve(fetchProjects(filters)),
    keepPreviousData: true,
    placeholderData: placeholderData,
  });
}
