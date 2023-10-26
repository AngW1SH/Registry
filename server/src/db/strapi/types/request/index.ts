import {
  TeamStrapiPopulated,
  TeamStrapiPopulatedWithAdministrators,
} from "../team";

export interface RequestStrapiInner {
  id: number;
  attributes: {
    team: TeamStrapiPopulatedWithAdministrators;
  };
}

export interface RequestStrapi {
  data: RequestStrapiInner;
}

export interface RequestListStrapi {
  data: RequestStrapiInner[];
}

interface RequestInfoStrapiInner {
  id: number;
  attributes: {
    team: {
      data: {
        id: number;
      } | null;
    };
    project: {
      data: {
        id: number;
      } | null;
    };
  };
}

export interface RequestInfoStrapi {
  data: RequestInfoStrapiInner;
}

export interface RequestInfoListStrapi {
  data: RequestInfoStrapiInner[];
}
