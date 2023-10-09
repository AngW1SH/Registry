import { Tag } from "@/entities/tag";
import { TagListStrapi, TagStrapi } from "@/entities/tag/types/types";
import { TeamStrapiPopulated } from "@/entities/team/types/types";

export interface Project {
  id: string;
  name: string;
  description: string;
  developerRequirements: string[];
  dateStart: Date;
  dateEnd: Date;
  enrollmentStart: Date;
  enrollmentEnd: Date;
  //createdAt: Date;
  supervisor: string;
  curator: string;
  client: string;
  tags: number[];
  teamId: number;
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
  curator: string;
  client: string;
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

export interface ProjectStrapiPopulated {
  data: {
    id: string;
    attributes: {
      name: string;
      description: string;
      developerRequirements: ProjectStrapiDeveloperRequirement[];
      dateStart: Date;
      dateEnd: Date;
      enrollmentStart: Date;
      enrollmentEnd: Date;
      supervisor: string;
      curator: string;
      client: string;
      tags: TagListStrapi;
      team: TeamStrapiPopulated;
      isPublic: boolean;
    };
  };
}

export interface ProjectStrapiDeveloperRequirement {
  id: number;
  developerRequirement: string;
}

export interface ProjectWithTags extends Omit<Project, "tags"> {
  tags: Tag[];
}
