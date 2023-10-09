import { Tag, TagStrapi } from "@/entities/tag/types/types";

export const flattenTag = (tag: TagStrapi): Tag => {
  return {
    id: tag.data.id,
    name: tag.data.attributes.name,
  };
};
