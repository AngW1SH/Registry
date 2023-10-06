import { ProjectDTO } from "@/entities/Project";
import { getProjectFromDTO } from "@/entities/Project/utils";
import { Filters } from "@/entities/ProjectFilters";
import { ITag } from "@/entities/Tag";
import { ProjectsData } from "../types/types";

export const fetchProjects = async (
  filters?: Filters,
): Promise<ProjectsData> => {
  const resultDTO: { projects: ProjectDTO[]; tags: ITag[] } = await fetch(
    "http://localhost:3000/api/project/findmany",
    {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters ? { filters } : {}),
    },
  ).then((response) => response.json());

  const result = {
    ...resultDTO,
    projects: resultDTO.projects.map((projectDTO) =>
      getProjectFromDTO(projectDTO),
    ),
  };

  return result;
};
