import { NamedFileStrapi } from "../components/named-file";
import { TagListStrapi } from "../tag";
import { TeamListStrapiPopulated } from "../team";
import { UserListStrapi } from "../user";

export interface ProjectStrapiPopulated {
  data: {
    id: number;
    attributes: {
      name: string;
      description: string;
      descriptionFiles: NamedFileStrapi[];
      resultFiles: NamedFileStrapi[];
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
      teams: TeamListStrapiPopulated;
      teamLimit: number;
      isPublic: boolean;
    };
  };
}

interface ProjectWithTagsStrapiInner {
  id: number;
  attributes: {
    name: string;
    description: string;
    descriptionFiles: NamedFileStrapi[];
    resultFiles: NamedFileStrapi[];
    developerRequirements: string[];
    dateStart: Date;
    dateEnd: Date;
    enrollmentStart: Date;
    enrollmentEnd: Date;
    //createdAt: Date;
    supervisor: string;
    curator: string;
    teams: {
      data:
        | {
            id: number;
          }[]
        | null;
    };
    teamLimit: number;
    requestCount: number;
    client: string;
    tags: TagListStrapi;
  };
}

export interface ProjectWithTagsListStrapi {
  data: ProjectWithTagsStrapiInner[];
}

export interface ProjectWithTagsStrapi {
  data: ProjectWithTagsStrapiInner;
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
