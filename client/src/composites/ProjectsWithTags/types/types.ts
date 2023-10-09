import { IProject, ProjectDTO } from "@/entities/Project";
import { ITag } from "@/entities/Tag";

export interface IProjectsWithTags {
  projects: IProject[];
  tags: ITag[];
}

export interface IProjectsWithTagsDTO {
  projects: ProjectDTO[];
  tags: ITag[];
}
