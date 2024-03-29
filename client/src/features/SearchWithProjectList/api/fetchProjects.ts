import { Filters } from "@/entities/ProjectFilters";
import {
  IProjectsWithTags,
  IProjectsWithTagsDTO,
} from "@/composites/ProjectsWithTags/types/types";
import { getProjectsWithTagsFromDTO } from "@/composites/ProjectsWithTags";

export const fetchProjects = async (
  filters?: Filters,
  pageParam = 1,
): Promise<IProjectsWithTags | null> => {
  const resultDTO: IProjectsWithTagsDTO | null = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "api/project/findmany",
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...(filters ? { filters } : {}),
        page: pageParam,
      }),
    },
  ).then((response) => {
    try {
      return response.ok ? response.json() : null;
    } catch {
      return null;
    }
  });

  return resultDTO ? getProjectsWithTagsFromDTO(resultDTO) : null;
};
