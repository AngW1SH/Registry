import { getProjectFromStrapiDTO } from "@/db/strapi/adapters/project";
import { strapi } from "@/db/strapi/client";
import { selectNamedFile } from "@/db/strapi/queries/components/named-file";
import { NamedFileStrapi } from "@/db/strapi/types/components/named-file";
import { ServerError } from "@/helpers/errors";
import { UploadedFile } from "express-fileupload";
import uploadRepository from "../upload";

const projectResultsRepositoryFactory = () => {
  return Object.freeze({
    addFiles,
    changeFile,
    deleteFile,
    findFiles,
  });

  async function findFiles(project: number) {
    const params = {
      populate: {
        resultFiles: selectNamedFile(),
      },
    };

    const response = await strapi.get("projects/" + project, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    return getProjectFromStrapiDTO(response).project?.resultFiles;
  }

  async function addFiles(project: number, files: UploadedFile[]) {
    const params = {
      populate: {
        resultFiles: selectNamedFile(),
      },
    };

    const response = await strapi.get("projects/" + project, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data.attributes.resultFiles)
      throw new ServerError("Couldn't find project's resultFiles");

    const resultFiles: NamedFileStrapi[] = response.data.attributes.resultFiles;

    const fileUploadResponse = await uploadRepository.upload(files);

    const body = {
      select: {
        resultFiles: selectNamedFile(),
      },
      data: {
        resultFiles: [
          ...(resultFiles
            ? resultFiles.map((file) => ({
                name: file.name,
                date: file.date,
                file: file.file.data?.id,
              }))
            : []),
          ...fileUploadResponse.map((file: any) => ({
            name: file.name,
            date: new Date(),
            file: file.id,
          })),
        ],
      },
    };

    const createResponse = await strapi.put("projects/" + project, {
      token: process.env.PROJECTS_TOKEN!,
      body,
    });

    return 200;
  }

  async function deleteFile(projectId: number, fileId: number) {
    const params = {
      populate: {
        resultFiles: selectNamedFile(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data.attributes.resultFiles)
      throw new ServerError("Couldn't find project's resultFiles");

    const resultFiles: NamedFileStrapi[] = response.data.attributes.resultFiles;

    const body = {
      data: {
        resultFiles: resultFiles
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
    projectId: number,
    fileId: number,
    file: UploadedFile
  ) {
    const params = {
      populate: {
        resultFiles: selectNamedFile(),
      },
    };

    const response = await strapi.get("projects/" + projectId, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data.attributes.resultFiles)
      throw new ServerError("Couldn't find project's resultFiles");

    const resultFiles: NamedFileStrapi[] = response.data.attributes.resultFiles;

    const fileUploadResponse = await uploadRepository.upload(file);

    const body = {
      data: {
        resultFiles: resultFiles.map((file) => ({
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
