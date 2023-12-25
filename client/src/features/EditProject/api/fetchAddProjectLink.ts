import { authorizedFetch } from "@/shared/utils";

export const fetchAddProjectLink = async (
  projectId: number,
  resource: string,
  link: string,
) => {
  const result: any = await authorizedFetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/project/" + projectId + "/link",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ platform: resource, link }),
    },
  ).then((response) => {
    if (!response.ok) return 0;
    return 1;
  });

  return result;
};
