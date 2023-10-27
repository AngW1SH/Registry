import { Request } from "@/entities/request";
import { RequestInfoListStrapi } from "../../types/request";

export const getRequestInfoListFromStrapiDTO = (
  requests: RequestInfoListStrapi
): Request[] => {
  return requests.data.map((request) => ({
    id: request.id,
    team: request.attributes.team.data ? request.attributes.team.data.id : null,
    project: request.attributes.project.data
      ? request.attributes.project.data.id
      : null,
  }));
};
