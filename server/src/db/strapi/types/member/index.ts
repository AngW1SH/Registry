import { IdStrapi } from "@/db/types/types";
import { UserStrapi } from "../user";

interface MemberStrapiInner {
  id: number;
  attributes: {
    name: string;
    role: string;
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
