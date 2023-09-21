import { IProject } from "@/entities/Project";
import { ITag } from "@/entities/Tag";

export type ActiveProjectsData = {
  projects: IProject[];
  tags: ITag[];
};
