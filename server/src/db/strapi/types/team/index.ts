import { IdListStrapi, IdStrapi } from "@/db/types/types";
import { MemberListStrapi } from "../member";
import { UserListStrapi } from "../user";
import { RequestListStrapi } from "../request";

export interface TeamStrapiInner {
  id: number;
  attributes: {
    name: string;
    members?: MemberListStrapi | IdListStrapi;
    administrators?: UserListStrapi | IdListStrapi;
    project?: {
      data: {
        id: number;
        attributes: {
          slug: string;
        };
      };
    };
    requests?: RequestListStrapi | IdListStrapi;
  };
}

export interface TeamStrapi {
  data: TeamStrapiInner | null;
}

export interface TeamListStrapi {
  data: TeamStrapiInner[];
}
