import { authorizedFetch } from "@/shared/utils";

export const fetchAvailableRequests = async () => {
  const result = await authorizedFetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/request/available",
  ).then((response) => {
    if (!response.ok) return { teams: [], projectReferences: [] };

    try {
      response.json();
    } catch {
      return { teams: [], projectReferences: [] };
    }
  });

  return result;
};
