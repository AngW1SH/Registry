import { Tag } from "@/entities/tag";
import { TagListStrapi, TagStrapi } from "../../types/tag";

export const getTagFromStrapiDTO = (
  tag: TagStrapi,
  options?: { projectCount?: boolean }
): { tag: Tag } => {
  return {
    tag: {
      id: tag.data.id,
      name: tag.data.attributes.name,
      ...(options &&
        options.projectCount && {
          projectCount:
            tag.data.attributes.projects?.data?.attributes.count || 0,
        }),
    },
  };
};

export const getTagListFromStrapiDTO = (
  tags: TagListStrapi,
  options?: { projectCount?: boolean }
): Tag[] => {
  return tags.data.map(
    (tag) => getTagFromStrapiDTO({ data: tag }, options).tag
  );
};
