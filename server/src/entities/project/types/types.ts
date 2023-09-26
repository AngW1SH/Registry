import { Tag } from "@/entities/tag";

export interface Project {
  id: string;
  name: string;
  description: string;
  developerRequirements: string;
  dateStart: Date;
  dateEnd: Date;
  enrollmentStart: Date;
  enrollmentEnd: Date;
  //createdAt: Date;
  supervisor: string;
  tags: string[];
  //teamId: string;
  isPublic: boolean;
}

export interface ProjectDTO {
  id: string;
  name: string;
  description: string;
  developerRequirements: string;
  dateStart: string;
  dateEnd: string;
  enrollmentStart: string;
  enrollmentEnd: string;
  //createdAt: string;
  supervisor: string;
  tags: string[];
  //teamId: string;
  isPublic: boolean;
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

export interface ProjectWithTags extends Omit<Project, "tags"> {
  tags: Tag[];
}
