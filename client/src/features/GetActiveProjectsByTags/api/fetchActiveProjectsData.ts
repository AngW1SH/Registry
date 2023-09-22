import { ITag } from "@/entities/Tag";
import { ProjectDTO } from "@/entities/Project";
import { getProjectFromDTO } from "@/entities/Project/utils";
import { ActiveProjectsData } from "../types/types";

export const fetchActiveProjectsData = async (
  tags?: ITag[],
): Promise<ActiveProjectsData> => {
  const resultDTO: { projects: ProjectDTO[]; tags: ITag[] } = await fetch(
    "http://localhost:3000/api/project/active",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tagIds: tags ? tags.map((tag) => tag.id) : [],
      }),
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
