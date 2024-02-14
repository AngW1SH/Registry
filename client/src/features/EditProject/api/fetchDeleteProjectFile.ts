import { authorizedFetch } from "@/shared/utils";

export const fetchDeleteProjectFile = async (
  projectId: string,
  fileId: number,
) => {
  const result: any = await authorizedFetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      "/api/project/" +
      projectId +
      "/result-files/" +
      fileId,
    {
      method: "DELETE",
    },
  ).then((response) => {
    if (!response.ok) return 0;

    return 1;
  });

  return result;
};
