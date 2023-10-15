import { ProjectStatusData } from "../types/types";

export const fetchProjectStatusData = async (projectId: number) => {
  const result: ProjectStatusData = await fetch(
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
