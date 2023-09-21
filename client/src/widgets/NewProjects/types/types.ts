import { IProject } from "@/entities/Project";
import { ITag } from "@/entities/Tag";

export type NewProjectsData = {
  tags: ITag[];
  projects: IProject[];
};
