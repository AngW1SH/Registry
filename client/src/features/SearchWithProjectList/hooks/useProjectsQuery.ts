"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

  return useInfiniteQuery<IProjectsWithTags | null>({
    queryKey: ["projects-list", serializeFilters(filters)],
    initialData: { pages: [placeholderData], pageParams: [1] },
    queryFn: ({ pageParam = 1 }) =>
      Promise.resolve(fetchProjects(filters, pageParam)),
    getNextPageParam: (lastPage, pages) =>
      lastPage?.projects && lastPage?.projects.length
        ? pages.length + 1
        : undefined,
  });
}
