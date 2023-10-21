import { strapi } from "@/db/strapi/client";
import { UploadedFile } from "express-fileupload";

const requestRepositoryFactory = () => {
  return Object.freeze({
    add,
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
};

const requestRepository = requestRepositoryFactory();

export default requestRepository;
