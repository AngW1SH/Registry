import {
  getRequestInfoListFromStrapiDTO,
  getRequestListFromStrapiDTO,
} from "@/db/strapi/adapters/request";
import { strapi } from "@/db/strapi/client";
import { selectMember } from "@/db/strapi/queries/member";
import {
  filterActiveRequests,
  filterUserRequests,
  selectRequest,
} from "@/db/strapi/queries/request";
import { selectTeam } from "@/db/strapi/queries/team";
import { selectUser } from "@/db/strapi/queries/user";
import {
  RequestInfoListStrapi,
  RequestListStrapi,
  RequestStrapi,
} from "@/db/strapi/types/request";
import { Member } from "@/entities/member";
import { Request } from "@/entities/request";
import { Team } from "@/entities/team";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { User } from "@/entities/user";
import { UploadedFile } from "express-fileupload";

const requestRepositoryFactory = () => {
  return Object.freeze({
    add,
    getActiveByUser,
    getActiveByProject,
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
      throw new Error("Failed to create a Request");

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", new Blob([file.data]), file.name);
    });

    formData.append("ref", "api::request.request");
    formData.append("refId", createResponse.data.id);
    formData.append("field", "files");

    const fileUploadResponse = await fetch(process.env.STRAPI_URL + "upload", {
      headers: {
        Authorization: "bearer " + process.env.UPLOAD_TOKEN,
      },
      method: "POST",
      body: formData as any,
    });

    if (!fileUploadResponse.ok) throw new Error("Failed to upload files");

    return 1;
  }

  async function getActiveByUser(userId: number): Promise<Request[]> {
    const params = {
      filters: {
        ...filterUserRequests(userId),
        ...filterActiveRequests(),
      },
      ...selectRequest(),
    };

    const result: RequestInfoListStrapi = await strapi.get("requests", {
      token: process.env.REQUESTS_TOKEN!,
      params,
    });

    if (!result.data) return [];

    return getRequestInfoListFromStrapiDTO(result);
  }

  async function getActiveByProject(projectId: number): Promise<{
    requests: Request[] | null;
    teams: Team[] | TeamWithAdministrators[] | null;
    users: User[] | null;
    administrators: User[] | null;
    members: Member[] | null;
  } | null> {
    const params = {
      filters: {
        project: projectId,
      },
      ...selectRequest({
        team: selectTeam({
          members: selectMember({
            user: selectUser(),
          }),
        }),
      }),
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
