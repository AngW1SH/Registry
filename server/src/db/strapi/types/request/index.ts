import { IdStrapi } from "@/db/types/types";
import { TeamStrapi } from "../team";
import { NamedFileStrapi } from "../components/named-file";

interface RequestStrapiInner {
  id: number;
  attributes: {
    name: string;
    team?: TeamStrapi | IdStrapi;
    project?: IdStrapi;
    files?: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
          mime: string;
          size: number;
        };
      }[];
    };
  };
}

export interface RequestStrapi {
  data: RequestStrapiInner;
}

export interface RequestListStrapi {
  data: RequestStrapiInner[];
}
