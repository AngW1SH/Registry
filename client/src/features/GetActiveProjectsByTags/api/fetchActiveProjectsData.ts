import { ITag } from "@/entities/Tag";
import {
  IProjectsWithTags,
  IProjectsWithTagsDTO,
} from "@/composites/ProjectsWithTags/types/types";
import { getProjectsWithTagsFromDTO } from "@/composites/ProjectsWithTags";

export const fetchActiveProjectsData = async (
  tags?: ITag[],
): Promise<IProjectsWithTags> => {
  const resultDTO: IProjectsWithTagsDTO = await fetch(
    "http://localhost:3000/api/project/active",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tagIds: tags ? tags.map((tag) => tag.name) : [],
      }),
    },
  ).then((response) => response.json());

  return getProjectsWithTagsFromDTO(resultDTO);
};
