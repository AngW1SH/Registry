import { NamedFile } from "@/shared/types";

export interface IProjectReference {
  id: string;
  name: string;
}

export type IProject = {
  id: string;
  name: string;
  description: string;
  dateStart: Date;
  dateEnd: Date;
  enrollmentStart: Date;
  enrollmentEnd: Date;
  //createdAt: Date;
  supervisor: string;
  curator: string;
  client: string;
  tags: number[];
  teams: number[];
  teamLimit: number;
};

export type ProjectDTO = {
  id: string;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  enrollmentStart: string;
  enrollmentEnd: string;
  //createdAt: string;
  supervisor: string;
  curator: string;
  client: string;
  tags: number[];
  teams: number[];
  teamLimit: number;
};

export interface IProjectSingle extends IProject {
  requestCount: number;
  developerRequirements: string[];
  descriptionFiles: NamedFile[];
  resultFiles: NamedFile[];
  related: IProject[];
  links: {
    id: number;
    platform: string;
    link: string;
  }[];
}

export interface IProjectSingleDTO extends ProjectDTO {
  requestCount: number;
  developerRequirements: string[];
  descriptionFiles: NamedFile[];
  resultFiles: NamedFile[];
  related: ProjectDTO[];
  links: {
    id: number;
    platform: string;
    link: string;
  }[];
}

export enum ProjectStage {
  hiring,
  active,
  completed,
}
