import {
  getRequestFromStrapiDTO,
  getRequestInfoListFromStrapiDTO,
} from "@/db/strapi/adapters/team";
import { strapi } from "@/db/strapi/client";
import {
  filterActiveRequests,
  filterUserRequests,
  selectRequest,
} from "@/db/strapi/queries/request";
import {
  RequestInfoListStrapi,
  RequestListStrapi,
  RequestStrapi,
} from "@/db/strapi/types/request";
import { Request } from "@/entities/request";
import { UploadedFile } from "express-fileupload";

const requestRepositoryFactory = () => {
  return Object.freeze({
    add,
    getActiveByUser,
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
      token: process.env.REQUESTS_TOKEN,
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
      token: process.env.REQUESTS_TOKEN,
      params,
    });

    if (!result.data) return [];

    return getRequestInfoListFromStrapiDTO(result);
  }
};

const requestRepository = requestRepositoryFactory();

export default requestRepository;
