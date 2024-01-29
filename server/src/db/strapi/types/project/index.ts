import { IdListStrapi } from "@/db/types/types";
import { NamedFileStrapi } from "../components/named-file";
import { TagListStrapi } from "../tag";
import { TeamListStrapi } from "../team";
import { ProjectLinkStrapi } from "../components/project-link";

interface ProjectStrapiInner {
  id: number;
  attributes: {
    name: string;
    description: string;
    descriptionFiles?: NamedFileStrapi[];
    resultFiles?: NamedFileStrapi[];
    developerRequirements?: ProjectStrapiDeveloperRequirement[];
    projectLink?: ProjectLinkStrapi[];
    dateStart: string;
    dateEnd: string;
    enrollmentStart: string;
    enrollmentEnd: string;
    slug: string;
    supervisor: string;
    curator: string;
    client: string;
    requests?: ProjectRequestCountStrapi;
    tags?: TagListStrapi | IdListStrapi;
    teams?: TeamListStrapi | IdListStrapi;
    teamLimit: number | null;
    related?: ProjectListStrapi;
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
    slug: string;
  };
}

export interface ProjectReferenceStrapi {
  data: ProjectReferenceStrapiInner;
}

export interface ProjectReferenceListStrapi {
  data: ProjectReferenceStrapiInner[];
}
