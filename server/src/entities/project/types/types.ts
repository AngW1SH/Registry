import { Tag } from "@/entities/tag";
import { TagListStrapi } from "@/entities/tag/types/types";
import { TeamStrapiPopulated } from "@/entities/team/types/types";
import { UserListStrapi } from "@/entities/user";

export interface Project {
  id: number;
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
  requestCount: number;
  client: string;
  tags: number[];
  team: number;
}

export interface ProjectDTO {
  id: number;
  name: string;
  description: string;
  developerRequirements: string[];
  dateStart: string;
  dateEnd: string;
  enrollmentStart: string;
  enrollmentEnd: string;
  //createdAt: string;
  supervisor: string;
  requestCount: number;
  curator: string;
  client: string;
  tags: number[];
  team: number;
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
    id: number;
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
      administrators: UserListStrapi;
      requests: ProjectRequestCountStrapi;
      client: string;
      tags: TagListStrapi;
      team: TeamStrapiPopulated;
      isPublic: boolean;
    };
  };
}

export interface ProjectRequestCountStrapi {
  data: {
    attributes: {
      count: number;
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
