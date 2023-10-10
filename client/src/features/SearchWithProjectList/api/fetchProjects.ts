import { Filters } from "@/entities/ProjectFilters";
import {
  IProjectsWithTags,
  IProjectsWithTagsDTO,
} from "@/composites/ProjectsWithTags/types/types";
import { getProjectsWithTagsFromDTO } from "@/composites/ProjectsWithTags";

export const fetchProjects = async (
  filters?: Filters,
): Promise<IProjectsWithTags> => {
  const resultDTO: IProjectsWithTagsDTO = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/project/findmany",
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters ? { filters } : {}),
    },
  ).then((response) => response.json());

  return getProjectsWithTagsFromDTO(resultDTO);
};
