import { ImageCategoryStrapi } from "@/db/strapi/types/components/image-category";
import { ImageCategory } from "@/entities/category";
import { getTagFromStrapiDTO } from "../../tag";

export const getImageCategoryFromStrapiDTO = (
  dto: ImageCategoryStrapi
): ImageCategory | null => {
  if (!dto || !dto.tag.data || !dto.image.data) return null;

  const { tag } = getTagFromStrapiDTO(dto.tag);

  return {
    type: "image",
    name: tag.name,
    link: "projects?tag0=" + tag.name,
    image: "/strapi" + dto.image.data.attributes.url,
    projectsCount: 0,
  };
};
