import { ITag } from "@/entities/Tag";
import {
  IProjectsWithTags,
  IProjectsWithTagsDTO,
} from "@/composites/ProjectsWithTags/types/types";
import { getProjectsWithTagsFromDTO } from "@/composites/ProjectsWithTags";

export const fetchActiveProjectsData = async (
  tags?: ITag[],
): Promise<IProjectsWithTags | null> => {
  const resultDTO: IProjectsWithTagsDTO | null = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "api/project/active",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tagIds: tags ? tags.map((tag) => tag.name) : [],
      }),
    },
  ).then((response) => {
    try {
      return response.ok ? response.json() : null;
    } catch {
      return null;
    }
  });

  return resultDTO ? getProjectsWithTagsFromDTO(resultDTO) : null;
};
