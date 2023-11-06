import { ProjectFilters } from "@/entities/project";
import { generateProjectFilters } from "./utils/generateProjectFilters";
import { checkFilterValidity } from "./utils/checkFilterValidity";
import { Project, ProjectDTO } from "@/entities/project/types/types";
import { Team } from "@/entities/team";
import {
  filterActiveRequests,
  selectRequest,
} from "@/db/strapi/queries/request";
import { selectTeam } from "@/db/strapi/queries/team";
import { selectMember } from "@/db/strapi/queries/member";
import { selectUser } from "@/db/strapi/queries/user";
import {
  selectDescriptionFiles,
  selectDeveloperRequirements,
  selectProjectInList,
  selectProjectReference,
  selectResultFiles,
  selectUserProject,
} from "@/db/strapi/queries/project";
import { selectTag } from "@/db/strapi/queries/tag/selects";
import { strapi } from "@/db/strapi/client";
import { Tag } from "@/entities/tag";
import { ProjectListStrapi } from "@/db/strapi/types/project";
import {
  getProjectFromStrapiDTO,
  getProjectListFromStrapiDTO,
} from "@/db/strapi/adapters/project";
import { User } from "@/entities/user";
import { Member } from "@/entities/member";
import { Request } from "@/entities/request";
import requestRepository from "../request";
import { BadRequestError, ServerError } from "@/helpers/errors";
import { UploadedFile } from "express-fileupload";
import { selectNamedFile } from "@/db/strapi/queries/components/named-file";
import { NamedFileStrapi } from "@/db/strapi/types/components/named-file";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getNew,
    findOne,
    findMany,
    getReferences,
    findResultFiles,
    addResultFiles,
    deleteResultFile,
  });

  async function getNew(limit?: number): Promise<{
    projects: ProjectDTO[];
    tags: Tag[];
  } | null> {
    const now = new Date();

    const params = {
      sort: ["dateStart:desc"],
      filters: {
        dateEnd: {
          $gte: now,
        },
      },
      ...selectProjectInList({
        tags: selectTag(),
      }),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    const { projects, tags } = getProjectListFromStrapiDTO(response);

    return {
      projects: projects!,
      tags: tags!,
    };
  }

  async function findOne(
    id: number,
    options?: {
      includeAdmin: boolean;
    }
  ): Promise<{
    project: ProjectDTO | null;
    tags: Tag[];
    teams: Team[];
    users: User[];
    members: Member[];
    administrators?: User[];
  } | null> {
    if (typeof id != "number")
      throw new BadRequestError("Provided ID is not a number");

    const params = {
      filters: {
        id: id,
      },
      populate: {
        tags: selectTag(),
        teams: selectTeam({
          members: selectMember({
            user: selectUser(),
          }),
          ...(options &&
            options.includeAdmin && { administrators: selectUser() }),
        }),
        developerRequirements: selectDeveloperRequirements(),
        requests: {
          count: true,
        },
        descriptionFiles: selectDescriptionFiles(),
        resultFiles: selectResultFiles(),
      },
    };

    const response = await strapi.get("projects/" + id, {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data) return null;

    const countRequests = await requestRepository.countActive({
      project: response.data.id,
    });

    response.data.attributes.requests.data.attributes.count = countRequests;

    return getProjectFromStrapiDTO(
      { data: response.data },
      { includeAdmin: true }
    );
  }

  async function findMany(filters?: ProjectFilters): Promise<{
    projects: ProjectDTO[];
    tags: Tag[];
  }> {
    if (!checkFilterValidity(filters)) return { projects: [], tags: [] };

    const params = {
      sort: ["dateStart:desc"],
      filters: filters ? generateProjectFilters(filters) : undefined,
      ...selectProjectInList({
        tags: selectTag(),
      }),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    const { projects, tags } = getProjectListFromStrapiDTO(response);

    return {
      projects: projects!,
      tags: tags!,
    };
  }

  async function getReferences(ids: number[]) {
    if (!ids.length) return [];

    const params = {
      filters: {
        id: {
          $in: ids,
        },
      },
      ...selectUserProject(),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    return getProjectListFromStrapiDTO(response).projects;
  }

  async function findResultFiles(project: number) {
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

  async function addResultFiles(project: number, files: UploadedFile[]) {
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

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", new Blob([file.data]), file.name);
    });

    const fileUploadResponse = await fetch(process.env.STRAPI_URL + "upload", {
      headers: {
        Authorization: "bearer " + process.env.UPLOAD_TOKEN,
      },
      method: "POST",
      body: formData as any,
    }).then((res) => (res.ok ? res.json() : null));

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

  async function deleteResultFile(projectId: number, fileId: number) {
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
};
const projectRepository = projectRepositoryFactory();
export default projectRepository;
