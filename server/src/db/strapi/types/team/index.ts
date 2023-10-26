import { MemberWithUserListStrapi } from "../member";
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
    members: MemberWithUserListStrapi;
  };
}

export interface TeamStrapiPopulatedWithAdministratorsInner
  extends TeamStrapiPopulatedInner {
  id: number;
  attributes: {
    name: string;
    members: MemberWithUserListStrapi;
    administrators: UserListStrapi;
  };
}

export interface TeamStrapiPopulatedWithAdministrators {
  data: TeamStrapiPopulatedWithAdministratorsInner | null;
}

export interface TeamListStrapiPopulatedWithAdministrators {
  data: TeamStrapiPopulatedWithAdministratorsInner[];
}
