import { IProject } from "@/entities/Project";
import { ITag } from "@/entities/Tag";

export interface ProjectsData {
  tags: ITag[];
  projects: IProject[];
}
