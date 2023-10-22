import { authorizedFetch } from "@/shared/utils";

export const sendRequest = async (
  team: number,
  files: File[],
  project: number,
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("team", "" + team);
  formData.append("project", "" + project);

  const response = await authorizedFetch("/api/request", {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (res.status !== 200) throw new Error("Failed to send a request");

    return res.status;
  });

  return response;
};
