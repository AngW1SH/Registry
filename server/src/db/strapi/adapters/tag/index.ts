import { Tag } from "@/entities/tag";
import { TagListStrapi, TagStrapi } from "../../types/tag";

export const getTagFromStrapiDTO = (tag: TagStrapi): { tag: Tag } => {
  return {
    tag: {
      id: tag.data.id,
      ...tag.data.attributes,
    },
  };
};

export const getTagListFromStrapiDTO = (tags: TagListStrapi): Tag[] => {
  return tags.data.map((tag) => getTagFromStrapiDTO({ data: tag }).tag);
};
