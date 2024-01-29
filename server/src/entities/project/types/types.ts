import { NamedFile } from "@/entities/components/named-file";
import { Tag } from "@/entities/tag";

export interface ProjectReference {
  id: string;
  name: string;
}

export interface Project {
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
  teamLimit: number | null;
  resultFiles?: NamedFile[] | null;
}

export interface ProjectDTO {
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
  teamLimit: number | null;
}

export interface ProjectFilters {
  text?: string;
  dateStart?: Date | null;
  dateEnd?: Date | null;
  enrollmentStart?: Date | null;
  enrollmentEnd?: Date | null;
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
  descriptionFiles: NamedFile[] | null;
  resultFiles: NamedFile[] | null;
  related: ProjectDTO[] | ProjectDetailedDTO[] | null;
  links: { id: number; platform: string; link: string }[];
}

export interface ProjectDetailedDTO extends ProjectDTO {
  requestCount: number;
  developerRequirements: string[];
  descriptionFiles: NamedFile[] | null;
  resultFiles: NamedFile[] | null;
  related: ProjectDTO[] | ProjectDetailedDTO[] | null;
  links: { id: number; platform: string; link: string }[];
}

export interface ProjectWithTags extends Omit<Project, "tags"> {
  tags: Tag[];
}
