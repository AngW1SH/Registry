import {
  TeamStrapiPopulated,
  TeamStrapiPopulatedWithAdministrators,
} from "../team";

export interface RequestStrapiInner {
  id: number;
  attributes: {
    role: string;
    team: TeamStrapiPopulatedWithAdministrators;
  };
}

export interface RequestStrapi {
  data: RequestStrapiInner;
}

export interface RequestListStrapi {
  data: RequestStrapiInner[];
}
