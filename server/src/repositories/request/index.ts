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

const requestRepositoryFactory = () => {
  return Object.freeze({
    add,
    getActive,
    countActive,
  });

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

    if (!createResponse.data || !createResponse.data.id)
      throw new ServerError("Failed to create a Request");

    const formData = new FormData();

    files.forEach((file) => {
      formData.append(
        "files",
        new Blob([file.data]),
        new Date().toTimeString() + file.name
      );
    });

    formData.append("ref", "api::request.request");
    formData.append("refId", createResponse.data.id);
    formData.append("field", "files");

    const fileUploadResponse = await fetch(process.env.STRAPI_URL + "upload", {
      headers: {
        Authorization: "bearer " + process.env.UPLOAD_TOKEN,
      },
      method: "POST",
      body: formData,
    });

    if (!fileUploadResponse.ok) throw new Error("Failed to upload files");

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

    const response = await strapi.get("projects", {
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

    return getRequestListFromStrapiDTO(result);
  }
};

const requestRepository = requestRepositoryFactory();

export default requestRepository;
