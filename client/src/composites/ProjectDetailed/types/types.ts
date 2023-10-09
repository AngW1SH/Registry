import { IProject, ProjectDTO } from "@/entities/Project";
import { ITag } from "@/entities/Tag";

export interface ProjectDetailed {
  project: IProject;
  tags: ITag[];
}

export interface ProjectDetailedDTO {
  project: ProjectDTO;
  tags: ITag[];
}
