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
