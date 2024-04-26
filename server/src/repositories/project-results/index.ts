import { getProjectFromStrapiDTO } from "@/db/strapi/adapters/project";
import { strapi } from "@/db/strapi/client";
import { selectNamedFile } from "@/db/strapi/queries/components/named-file";
import { NamedFileStrapi } from "@/db/strapi/types/components/named-file";
import { ServerError } from "@/helpers/errors";
import { UploadedFile } from "express-fileupload";
import uploadRepository from "../upload";
import projectRepository from "../project";
import { ProjectDocumentStrapi } from "@/db/strapi/types/components/project-document";
import { selectProjectDocument } from "@/db/strapi/queries/components/project-document";

const projectResultsRepositoryFactory = () => {
  return Object.freeze({
    addFile,
    changeFile,
    deleteFile,
    findFiles,
  });

  async function findFiles(projectSlug: string) {
    const projectId = await projectRepository.getInternalId(projectSlug);

    const params = {
      populate: {
        resultFiles: selectNamedFile(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch project files");

    return getProjectFromStrapiDTO(response).project?.resultFiles;
  }

  async function addFile(
    projectSlug: string,
    files: UploadedFile,
    fileTypeId: number
  ) {
    const projectId = await projectRepository.getInternalId(projectSlug);

    const params = {
      populate: {
        documents: selectProjectDocument(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch project files");

    if (!response.data.attributes.documents)
      throw new ServerError("Couldn't find project's documents");

    const documents: ProjectDocumentStrapi[] =
      response.data.attributes.documents;

    const fileUploadResponse = await uploadRepository.upload(files);

    const body = {
      select: {
        resultFiles: selectNamedFile(),
      },
      data: {
        documents: [
          ...(documents
            ? documents.map((file) => ({
                name: file.name,
                date: file.date,
                file: file.file.data?.id,
                type: file.type.data?.id,
              }))
            : []),
          ...fileUploadResponse.map((file: any) => ({
            name: file.name,
            date: new Date(),
            file: file.id,
            type: fileTypeId,
          })),
        ],
      },
    };

    const createResponse = await strapi.put("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      body,
    });

    if (!response) throw new ServerError("Couldn't update project files");

    return 200;
  }

  async function deleteFile(projectSlug: string, fileId: number) {
    const projectId = await projectRepository.getInternalId(projectSlug);

    const params = {
      populate: {
        documents: selectProjectDocument(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data.attributes.documents)
      throw new ServerError("Couldn't find project's documents");

    const documents: ProjectDocumentStrapi[] =
      response.data.attributes.documents;

    const body = {
      data: {
        documents: documents
          ?.filter((file) => file.id != fileId)
          .map((file) => ({ ...file, file: file.file?.data?.id })),
      },
    };

    const updatedResponse = await strapi.put("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      body,
    });

    return 200;
  }

  async function changeFile(
    projectSlug: string,
    fileId: number,
    file: UploadedFile
  ) {
    const projectId = await projectRepository.getInternalId(projectSlug);

    const params = {
      populate: {
        documents: selectProjectDocument(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data.attributes.documents)
      throw new ServerError("Couldn't find project's documents");

    const documents: ProjectDocumentStrapi[] =
      response.data.attributes.documents;

    const fileUploadResponse = await uploadRepository.upload(file);

    const body = {
      data: {
        resultFiles: documents.map((file) => ({
          ...file,
          file:
            file.id == fileId ? fileUploadResponse[0].id : file.file?.data?.id,
          name: file.id == fileId ? fileUploadResponse[0].name : file.name,
        })),
      },
    };

    const updatedResponse = await strapi.put("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      body,
    });

    return 200;
  }
};

const projectResultsRepository = projectResultsRepositoryFactory();

export default projectResultsRepository;
