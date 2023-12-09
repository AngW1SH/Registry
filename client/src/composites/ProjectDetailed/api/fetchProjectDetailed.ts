import { getProjectFromDTO } from "@/entities/Project/utils";
import { ProjectDetailed, ProjectDetailedDTO } from "../types/types";
import { getProjectSingleFromDTO } from "@/entities/Project";

export const fetchProjectDetailed = async (
  id: number,
): Promise<ProjectDetailed | null> => {
  const resultDTO: ProjectDetailedDTO | null = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/project/" + id,
  ).then((response) => {
    try {
      return response.ok ? response.json() : null;
    } catch {
      return null;
    }
  });

  return resultDTO
    ? {
        ...resultDTO,
        project: getProjectSingleFromDTO(resultDTO.project),
      }
    : null;
};
