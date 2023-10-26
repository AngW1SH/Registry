import { UserStrapi } from "../user";

interface MemberWithUserStrapiInner {
  id: number;
  attributes: {
    name: string;
    role: string;
    user: UserStrapi;
    team: {
      data: {
        id: number;
      } | null;
    };
  };
}

export interface MemberWithUserStrapi {
  data: MemberWithUserStrapiInner;
}

export interface MemberWithUserListStrapi {
  data: MemberWithUserStrapiInner[];
}
