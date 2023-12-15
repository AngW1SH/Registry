import { authorizedFetch } from "@/shared/utils";
import { ProjectStatusData } from "../types/types";

export const fetchProjectStatusData = async (projectId: number) => {
  const result: ProjectStatusData = await authorizedFetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/user/projectstatus/" + projectId,
  ).then((response) => {
    if (!response.ok)
      return {
        assignableTeams: 0,
      };
    try {
      return response.json();
    } catch {
      return { assignableTeams: 0 };
    }
  });

  return result;
};
