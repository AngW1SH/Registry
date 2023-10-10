import { getProjectFromDTO } from "@/entities/Project/utils";
import { ProjectDetailed, ProjectDetailedDTO } from "../types/types";

export const fetchProjectDetailed = async (
  id: number,
): Promise<ProjectDetailed> => {
  const resultDTO: ProjectDetailedDTO = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/project/findbyid/" + id,
  ).then((response) => response.json());

  return {
    ...resultDTO,
    project: getProjectFromDTO(resultDTO.project),
  };
};
