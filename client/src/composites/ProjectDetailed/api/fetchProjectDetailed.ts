import { getProjectFromDTO } from "@/entities/Project/utils";
import { ProjectDetailed, ProjectDetailedDTO } from "../types/types";
import { getProjectSingleFromDTO } from "@/entities/Project";

export const fetchProjectDetailed = async (
  id: number,
): Promise<ProjectDetailed> => {
  const resultDTO: ProjectDetailedDTO = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/project/findbyid/" + id,
  ).then((response) => response.json());

  return {
    ...resultDTO,
    project: getProjectSingleFromDTO(resultDTO.project),
  };
};
