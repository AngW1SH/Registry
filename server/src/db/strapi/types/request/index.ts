import { IdStrapi } from "@/db/types/types";
import { TeamStrapi } from "../team";

interface RequestStrapiInner {
  id: number;
  attributes: {
    team?: TeamStrapi;
  };
}

export interface RequestStrapi {
  data: RequestStrapiInner | null;
}

export interface RequestListStrapi {
  data: RequestStrapiInner[];
}

interface RequestInfoStrapiInner {
  id: number;
  attributes: {
    team?: TeamStrapi | IdStrapi;
    project?: IdStrapi;
  };
}

export interface RequestInfoStrapi {
  data: RequestInfoStrapiInner;
}

export interface RequestInfoListStrapi {
  data: RequestInfoStrapiInner[];
}
