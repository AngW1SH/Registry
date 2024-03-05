import { IResource } from "@/entities/Resource";
import { IProjectDetailed } from "..";

export const extractResources = (data: IProjectDetailed): IResource[] => {
  return data.resources.map((resource) => {
    return {
      id: resource.id,
      name: resource.name,
      project: resource.project,
      platform: resource.platform,
      params: resource.params,
    };
  });
};
