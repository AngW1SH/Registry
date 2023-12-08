"use client";
import { ITag } from "@/entities/Tag";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { fetchActiveProjectsData } from "../api/fetchActiveProjectsData";
import { IProjectsWithTags } from "@/composites/ProjectsWithTags";

export default function useActiveProjectsQuery(
  selectedTags: ITag[],
  placeholderData: IProjectsWithTags,
) {
  const serializeTagList = useCallback((tags: ITag[]) => {
    tags.sort((a, b) => (a.name > b.name ? 1 : -1));
    return tags.reduce((acc, cur) => {
      return acc + cur.name;
    }, "");
  }, []);

  return useQuery<IProjectsWithTags | null>({
    queryKey: ["active-projects", serializeTagList(selectedTags)],
    queryFn: () => Promise.resolve(fetchActiveProjectsData(selectedTags)),
    keepPreviousData: true,
    placeholderData: placeholderData,
  });
}
