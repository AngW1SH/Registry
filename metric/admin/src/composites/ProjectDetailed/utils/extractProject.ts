import { IProject } from "@/entities/Project";
import { IProjectDetailed } from "..";

export const extractProject = (data: IProjectDetailed): IProject => {
  return {
    id: data.id,
    name: data.name,
  };
};
