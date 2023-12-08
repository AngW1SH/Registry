import { UploadedFile } from "express-fileupload";

export interface FileToUpload {
  data: any;
  name: string;
}

const uploadRepositoryFactory = () => {
  return Object.freeze({ upload });

  async function upload(
    files: FileToUpload | FileToUpload[],
    additionalProps?: { [key in string]: string }
  ) {
    const formData = new FormData();

    if (Array.isArray(files))
      files.forEach((file) => {
        formData.append("files", new Blob([file.data]), file.name);
      });

    if (!Array.isArray(files))
      formData.append("files", new Blob([files.data]), files.name);

    if (additionalProps) {
      const additionalKeys = Object.keys(additionalProps);

      additionalKeys.forEach((key) => {
        formData.append(key, additionalProps[key]);
      });
    }

    const fileUploadResponse = await fetch(process.env.STRAPI_URL + "upload", {
      headers: {
        Authorization: "bearer " + process.env.UPLOAD_TOKEN,
      },
      method: "POST",
      body: formData as any,
    }).then((res) => {
      if (!res.ok) return null;
      try {
        return res.json();
      } catch {
        return null;
      }
    });

    return fileUploadResponse;
  }
};

const uploadRepository = uploadRepositoryFactory();

export default uploadRepository;
