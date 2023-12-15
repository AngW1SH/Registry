import { authorizedFetch } from "@/shared/utils";

export const fetchAddProjectFiles = async (
  projectId: number,
  files: File[],
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("project", "" + projectId);

  const result: any = await authorizedFetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      "/api/project/" +
      projectId +
      "/result-files",
    {
      method: "POST",
      body: formData,
    },
  ).then((response) => {
    if (!response.ok) return 0;
    return 1;
  });

  return result;
};
