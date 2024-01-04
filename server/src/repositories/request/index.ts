import { getRequestListFromStrapiDTO } from "@/db/strapi/adapters/request";
import { strapi } from "@/db/strapi/client";
import { selectMember } from "@/db/strapi/queries/member";
import {
  filterActiveRequests,
  filterUserRequests,
  selectRequest,
} from "@/db/strapi/queries/request";
import { selectTeam } from "@/db/strapi/queries/team";
import { selectUser } from "@/db/strapi/queries/user";
import { RequestListStrapi, RequestStrapi } from "@/db/strapi/types/request";
import { Member } from "@/entities/member";
import { Request } from "@/entities/request";
import { Team } from "@/entities/team";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { User } from "@/entities/user";
import { ServerError } from "@/helpers/errors";
import { UploadedFile } from "express-fileupload";
import uploadRepository from "../upload";

const requestRepositoryFactory = () => {
  return Object.freeze({
    add,
    edit,
    findMany,
    getActive,
    countActive,
    deleteOne,
  });

  async function findMany(
    filters: { id?: number },
    options?: {
      populate?: boolean;
    }
  ) {
    const params = {
      filters: {
        ...(filters.id && { id: filters.id }),
      },
      ...selectRequest(
        options && options.populate
          ? {
              team: selectTeam({
                members: selectMember({
                  user: selectUser(),
                }),
                administrators: selectUser(),
              }),
            }
          : undefined
      ),
    };

    const result: RequestListStrapi = await strapi.get("requests", {
      token: process.env.REQUESTS_TOKEN!,
      params,
    });

    if (!result.data) return null;

    return getRequestListFromStrapiDTO(result, { includeAdmin: true });
  }

  async function add(team: number, project: number, files: UploadedFile[]) {
    const body = {
      data: {
        team: { connect: [{ id: +team }] },
        project: { connect: [{ id: project }] },
        name: "123",
      },
    };

    const createResponse = await strapi.post("requests", {
      token: process.env.REQUESTS_TOKEN!,
      body,
    });

    if (!createResponse || !createResponse.data || !createResponse.data.id)
      throw new ServerError("Failed to create a Request");

    const fileUploadResponse = await uploadRepository.upload(files, {
      ref: "api::request.request",
      refId: createResponse.data.id,
      field: "files",
    });

    if (!fileUploadResponse) throw new ServerError("Couldn't upload files");

    return 1;
  }

  async function edit(request: number, files: UploadedFile[]) {
    const body = {
      data: {
        files: { set: [] },
      },
    };

    const deleteOldFilesResponse = await strapi.put("requests/" + request, {
      token: process.env.REQUESTS_TOKEN!,
      body,
    });

    const fileUploadResponse = await uploadRepository.upload(files, {
      ref: "api::request.request",
      refId: "" + request,
      field: "files",
    });

    if (!fileUploadResponse) throw new Error("Failed to upload files");

    return 1;
  }

  async function countActive(filters: {
    user?: number;
    project?: number;
  }): Promise<number> {
    const params = {
      filters: {
        ...(filters.user && filterUserRequests(filters.user)),
        ...(filters.project && { project: filters.project }),
        ...filterActiveRequests(),
      },
      populate: {
        requests: {
          count: true,
        },
      },
    };

    const response = await strapi.get("requests", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response.data.length) return 0;

    return response.data[0].attributes.requests
      ? response.data[0].attributes.requests.data.attributes.count
      : 0;
  }

  async function getActive(
    filters: { user?: number; project?: number },
    options?: {
      populate?: boolean;
    }
  ): Promise<{
    requests: Request[] | null;
    teams: Team[] | TeamWithAdministrators[] | null;
    users: User[] | null;
    administrators: User[] | null;
    members: Member[] | null;
  } | null> {
    const params = {
      filters: {
        ...(filters.user && filterUserRequests(filters.user)),
        ...(filters.project && { project: filters.project }),
        ...filterActiveRequests(),
      },
      ...selectRequest(
        options && options.populate
          ? {
              team: selectTeam({
                members: selectMember({
                  user: selectUser(),
                }),
                administrators: selectUser(),
                requests: selectRequest(),
              }),
            }
          : undefined
      ),
    };

    const result: RequestListStrapi = await strapi.get("requests", {
      token: process.env.REQUESTS_TOKEN!,
      params,
    });

    if (!result.data) return null;

    return getRequestListFromStrapiDTO(result, { includeAdmin: true });
  }

  async function deleteOne(id: number) {
    const result = await strapi.delete("requests/" + id, {
      token: process.env.REQUESTS_TOKEN!,
    });

    return 200;
  }
};

const requestRepository = requestRepositoryFactory();

export default requestRepository;
