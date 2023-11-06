import { authorizedFetch } from "@/shared/utils";

export const fetchChangeProjectFile = async (
  projectId: number,
  fileId: number,
  files: File[],
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const result: any = await authorizedFetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL +
      "/api/project/" +
      projectId +
      "/result-files/" +
      fileId,
    {
      method: "PUT",
      body: formData,
    },
  ).then((response) => {
    if (!response.ok) return 0;
    return 1;
  });

  return result;
};
