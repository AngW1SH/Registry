import { IdListStrapi, IdStrapi } from "@/db/types/types";
import { MemberListStrapi } from "../member";
import { UserListStrapi } from "../user";

export interface TeamStrapiInner {
  id: number;
  attributes: {
    name: string;
    members?: MemberListStrapi | IdListStrapi;
    administrators?: UserListStrapi | IdListStrapi;
    project?: IdStrapi;
  };
}

export interface TeamStrapi {
  data: TeamStrapiInner | null;
}

export interface TeamListStrapi {
  data: TeamStrapiInner[];
}
