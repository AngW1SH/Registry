import {
  IProjectsWithTags,
  getProjectsWithTagsFromDTO,
} from "@/composites/ProjectsWithTags";
import { IProjectsWithTagsDTO } from "@/composites/ProjectsWithTags/types/types";

export const fetchNewProjects = async (): Promise<IProjectsWithTags | null> => {
  const resultDTO: IProjectsWithTagsDTO | null = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "api/project/new",
  ).then((response) => {
    try {
      return response.ok ? response.json() : null;
    } catch {
      return null;
    }
  });

  return resultDTO ? getProjectsWithTagsFromDTO(resultDTO) : null;
};
