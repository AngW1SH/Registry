import { Tag } from "@/entities/tag";

export interface Project {
  id: number;
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
}

export interface ProjectDTO {
  id: number;
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
}

export interface ProjectFilters {
  text?: string;
  dateStart?: Date;
  dateEnd?: Date;
  enrollmentStart?: Date;
  enrollmentEnd?: Date;
  status?: string;
  tags?: string[];
}

export interface ProjectFiltersDTO {
  text?: string;
  dateStart?: string;
  dateEnd?: string;
  enrollmentStart?: string;
  enrollmentEnd?: string;
  status?: string;
  tags?: string[];
}

export interface ProjectDetailed extends Project {
  requestCount: number;
  developerRequirements: string[];
  descriptionFiles: {
    id: number;
    name: string;
    url: string;
  }[];
  resultFiles: {
    id: number;
    name: string;
    url: string;
  }[];
}

export interface ProjectDetailedDTO extends ProjectDTO {
  requestCount: number;
  developerRequirements: string[];
  descriptionFiles: {
    id: number;
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
  resultFiles: {
    id: number;
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
}

export interface ProjectWithTags extends Omit<Project, "tags"> {
  tags: Tag[];
}
