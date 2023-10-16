import { authorizedFetch } from "@/shared/utils";
import { ProjectStatusData } from "../types/types";

export const fetchProjectStatusData = async (projectId: number) => {
  const result: ProjectStatusData = await authorizedFetch(
    "/api/user/projectstatus/" + projectId,
  ).then((data) => {
    if (!data.ok)
      return {
        assignableTeams: 0,
      };
    return data.json();
  });

  return result;
};
