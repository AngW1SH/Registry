import { User, UserListStrapi, UserStrapi } from "@/entities/user";

export interface Team {
  id: number;
  name: string;
  users: number[];
}

export interface TeamStrapiPopulated {
  data: TeamStrapiPopulatedInner;
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

export interface TeamWithAdministrators extends Team {
  administrators: number[];
}

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
