import { getProjectFromDTO } from "@/entities/Project/utils";
import { IProjectsWithTags, IProjectsWithTagsDTO } from "../types/types";

export const getProjectsWithTagsFromDTO = (
  dto: IProjectsWithTagsDTO,
): IProjectsWithTags => {
  return {
    ...dto,
    projects: dto.projects.map((projectDTO) => getProjectFromDTO(projectDTO)),
  };
};
