import { IdListStrapi } from "@/db/types/types";
import { NamedFileStrapi } from "../components/named-file";
import { TagListStrapi } from "../tag";
import { TeamListStrapi, TeamListStrapiPopulated } from "../team";
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
      dateStart: string;
      dateEnd: string;
      enrollmentStart: string;
      enrollmentEnd: string;
      supervisor: string;
      curator: string;
      requests: ProjectRequestCountStrapi;
      client: string;
      tags: TagListStrapi;
      teams: TeamListStrapiPopulated;
      teamLimit: number;
    };
  };
}

interface ProjectStrapiInner {
  id: number;
  attributes: {
    name: string;
    description: string;
    descriptionFiles?: NamedFileStrapi[];
    resultFiles?: NamedFileStrapi[];
    developerRequirements?: ProjectStrapiDeveloperRequirement[];
    dateStart: string;
    dateEnd: string;
    enrollmentStart: string;
    enrollmentEnd: string;
    supervisor: string;
    curator: string;
    client: string;
    requests: ProjectRequestCountStrapi;
    tags?: TagListStrapi | IdListStrapi;
    teams?: TeamListStrapi | IdListStrapi;
    teamLimit: number;
  };
}

export interface ProjectStrapi {
  data: ProjectStrapiInner | null;
}

export interface ProjectListStrapi {
  data: ProjectStrapiInner[];
}

interface ProjectWithTagsStrapiInner {
  id: number;
  attributes: {
    name: string;
    description: string;
    dateStart: string;
    dateEnd: string;
    enrollmentStart: string;
    enrollmentEnd: string;
    //createdAt: Date;
    supervisor: string;
    curator: string;
    teams: {
      data:
        | {
            id: number;
            attributes?: {};
          }[]
        | null;
    };
    teamLimit: number;
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

interface ProjectReferenceStrapiInner {
  id: number;
  attributes: {
    name: string;
  };
}

export interface ProjectReferenceStrapi {
  data: ProjectReferenceStrapiInner;
}

export interface ProjectReferenceListStrapi {
  data: ProjectReferenceStrapiInner[];
}
