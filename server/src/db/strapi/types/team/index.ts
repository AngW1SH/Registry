import { MemberListStrapi } from "../member";
import { UserListStrapi } from "../user";

export interface TeamStrapiPopulated {
  data: TeamStrapiPopulatedInner | null;
}

export interface TeamListStrapiPopulated {
  data: TeamStrapiPopulatedInner[];
}

export interface TeamStrapiPopulatedInner {
  id: number;
  attributes: {
    name: string;
    members: MemberListStrapi;
    project: {
      data: {
        id: number;
      } | null;
    };
  };
}

export interface TeamStrapiPopulatedWithAdministratorsInner
  extends TeamStrapiPopulatedInner {
  id: number;
  attributes: {
    name: string;
    members: MemberListStrapi;
    administrators: UserListStrapi;
    project: {
      data: {
        id: number;
      } | null;
    };
  };
}

export interface TeamStrapiPopulatedWithAdministrators {
  data: TeamStrapiPopulatedWithAdministratorsInner | null;
}

export interface TeamListStrapiPopulatedWithAdministrators {
  data: TeamStrapiPopulatedWithAdministratorsInner[];
}
