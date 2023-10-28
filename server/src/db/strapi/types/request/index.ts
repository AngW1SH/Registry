import { IdStrapi } from "@/db/types/types";
import { TeamStrapi } from "../team";

interface RequestStrapiInner {
  id: number;
  attributes: {
    name: string;
    team?: TeamStrapi | IdStrapi;
    project?: IdStrapi;
  };
}

export interface RequestStrapi {
  data: RequestStrapiInner;
}

export interface RequestListStrapi {
  data: RequestStrapiInner[];
}
