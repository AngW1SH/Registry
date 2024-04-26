import { IdStrapi } from "@/db/types/types";
import { UserStrapi } from "../user";
import { UserRoleStrapi } from "../user-role";

interface MemberStrapiInner {
  id: number;
  attributes: {
    name: string;
    role: UserRoleStrapi;
    user?: UserStrapi | IdStrapi;
    team?: IdStrapi;
  };
}

export interface MemberStrapi {
  data: MemberStrapiInner;
}

export interface MemberListStrapi {
  data: MemberStrapiInner[];
}
