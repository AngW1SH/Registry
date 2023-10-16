import { Tag } from "@/entities/tag";
import { TagStrapi } from "../../types/tag";

export const getTagFromStrapiDTO = (tag: TagStrapi): { tag: Tag } => {
  return {
    tag: {
      id: tag.data.id,
      ...tag.data.attributes,
    },
  };
};
