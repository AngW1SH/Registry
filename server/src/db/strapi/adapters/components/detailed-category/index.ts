import { DetailedCategory } from "@/entities/category";
import { getTagFromStrapiDTO, getTagListFromStrapiDTO } from "../../tag";
import { DetailedCategoryStrapi } from "@/db/strapi/types/components/detailed-category";

export const getDetailedCategoryFromStrapiDTO = (
  dto: DetailedCategoryStrapi
): DetailedCategory | null => {
  if (!dto || !dto.tags.data || !dto.tags.data.length) return null;

  const tags = getTagListFromStrapiDTO(dto.tags);

  return {
    type: "detailed",
    showMore: false,
    name: dto.name,
    link:
      "/projects" +
      tags.reduce(
        (acc, cur) => ({
          value: acc.value + "?tag" + acc.index + "=" + cur.name,
          index: acc.index + 1,
        }),
        { value: "", index: 0 }
      ).value,
    tags: tags.map((tag) => ({
      id: "" + tag.id,
      name: tag.name,
      projectsCount: 0,
    })),
  };
};
