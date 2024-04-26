import {
  getProjectFileTypeFromStrapiDTO,
  getProjectFileTypeListFromStrapiDTO,
} from "@/db/strapi/adapters/project-file-type";
import { strapi } from "@/db/strapi/client";
import { selectProjectFileType } from "@/db/strapi/queries/project-file-type";
import { ProjectFileType } from "@/entities/project-file-type";

const projectFileTypeRepositoryFactory = () => {
  return Object.freeze({
    findAll,
    findOne,
  });

  async function findAll(): Promise<ProjectFileType[]> {
    const params = {
      ...selectProjectFileType(),
    };

    const result = await strapi.get("project-document-types/", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    return getProjectFileTypeListFromStrapiDTO(result);
  }

  async function findOne(id: number): Promise<ProjectFileType | null> {
    const params = {
      ...selectProjectFileType(),
    };

    const result = await strapi.get("project-document-types/" + id, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    return getProjectFileTypeFromStrapiDTO(result);
  }
};

const projectFileTypeRepository = projectFileTypeRepositoryFactory();

export default projectFileTypeRepository;
