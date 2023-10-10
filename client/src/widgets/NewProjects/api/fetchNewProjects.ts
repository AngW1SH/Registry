import {
  IProjectsWithTags,
  getProjectsWithTagsFromDTO,
} from "@/composites/ProjectsWithTags";
import { IProjectsWithTagsDTO } from "@/composites/ProjectsWithTags/types/types";

export const fetchNewProjects = async (): Promise<IProjectsWithTags> => {
  const resultDTO: IProjectsWithTagsDTO = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/project/new",
  ).then((data) => data.json());

  return getProjectsWithTagsFromDTO(resultDTO);
};
