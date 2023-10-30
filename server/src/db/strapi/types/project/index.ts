import { IdListStrapi } from "@/db/types/types";
import { NamedFileStrapi } from "../components/named-file";
import { TagListStrapi } from "../tag";
import { TeamListStrapi } from "../team";

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
    requests?: ProjectRequestCountStrapi;
    tags?: TagListStrapi | IdListStrapi;
    teams?: TeamListStrapi | IdListStrapi;
    teamLimit: number | null;
  };
}

export interface ProjectStrapi {
  data: ProjectStrapiInner | null;
}

export interface ProjectListStrapi {
  data: ProjectStrapiInner[];
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
