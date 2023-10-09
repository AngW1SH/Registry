import { getProjectFromDTO } from "@/entities/Project/utils";
import { ProjectDetailed, ProjectDetailedDTO } from "../types/types";

export const fetchProjectDetailed = async (
  id: number,
): Promise<ProjectDetailed> => {
  const resultDTO: ProjectDetailedDTO = await fetch(
    "http://localhost:3000/api/project/findbyid/" + id,
  ).then((response) => response.json());

  return {
    ...resultDTO,
    project: getProjectFromDTO(resultDTO.project),
  };
};
