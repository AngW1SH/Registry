import { ProjectDTO, staticProjects } from "@/entities/Project";
import { ITag, staticTags } from "@/entities/Tag";
import { NewProjectsData } from "../types/types";
import { getProjectFromDTO } from "@/entities/Project/utils";

export const fetchNewProjects = async (): Promise<NewProjectsData> => {
  const resultDTO: { projects: ProjectDTO[]; tags: ITag[] } = await fetch(
    "http://localhost:3000/api/project/new",
  ).then((data) => data.json());

  return {
    ...resultDTO,
    projects: resultDTO.projects.map((projectDTO) =>
      getProjectFromDTO(projectDTO),
    ),
  };
};
