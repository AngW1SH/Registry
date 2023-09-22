"use client";
import { ITag } from "@/entities/Tag";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { ActiveProjectsData } from "../types/types";
import { fetchActiveProjectsData } from "../api/fetchActiveProjectsData";

export default function useActiveProjectsQuery(
  selectedTags: ITag[],
  placeholderData: ActiveProjectsData,
) {
  const serializeTagList = useCallback((tags: ITag[]) => {
    tags.sort((a, b) => (a.name > b.name ? 1 : -1));
    return tags.reduce((acc, cur) => {
      return acc + cur.name;
    }, "");
  }, []);

  return useQuery<ActiveProjectsData>({
    queryKey: ["active-projects", serializeTagList(selectedTags)],
    queryFn: () => Promise.resolve(fetchActiveProjectsData(selectedTags)),
    keepPreviousData: true,
    placeholderData: placeholderData,
    staleTime: 120000,
  });
}
