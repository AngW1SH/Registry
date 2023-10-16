import { UserListStrapi, UserStrapi } from "../user";

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
    members: {
      data: TeamMemberStrapiPopulated[];
    };
    administrators: UserListStrapi;
  };
}

export interface TeamMemberStrapiPopulated {
  id: number;
  attributes: {
    name: string;
    role: string;
    user: UserStrapi;
  };
}
