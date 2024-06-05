import { Tag } from "@/entities/tag";
import { TagListStrapi, TagStrapi } from "../../types/tag";
import {
  ProjectFileTypeListStrapi,
  ProjectFileTypeStrapi,
} from "../../types/project-file-type";
import { ProjectFileType } from "@/entities/project-file-type";

export const getProjectFileTypeFromStrapiDTO = (
  tag: ProjectFileTypeStrapi,
  options?: { projectCount?: boolean }
): ProjectFileType | null => {
  if (!tag || !tag.data) return null;

  return {
    id: tag.data.id,
    name: tag.data.attributes.name,
    isPublic: tag.data.attributes.isPublic || false,
  };
};

export const getProjectFileTypeListFromStrapiDTO = (
  data: ProjectFileTypeListStrapi,
  options?: { projectCount?: boolean }
): ProjectFileType[] => {
  return data.data
    .map((row) => getProjectFileTypeFromStrapiDTO({ data: row }, options))
    .filter((row) => row) as ProjectFileType[];
};
