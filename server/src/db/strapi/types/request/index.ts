import { TeamStrapiPopulated } from "../team";

export interface RequestStrapiInner {
  id: number;
  attributes: {
    role: string;
    team: TeamStrapiPopulated;
  };
}

export interface RequestStrapi {
  data: RequestStrapiInner;
}

export interface RequestListStrapi {
  data: RequestStrapiInner[];
}
