import { authorizedFetch } from "@/shared/utils";

export const fetchDeleteRequest = async (requestId: number) => {
  const result = await authorizedFetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "/api/request/" + requestId,
    {
      method: "DELETE",
    },
  ).then((response) => {
    if (!response.ok) return 0;

    return 1;
  });

  return result;
};
