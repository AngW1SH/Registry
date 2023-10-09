import { User, UserStrapi } from "@/entities/user/types/types";

export interface Team {
  id: number;
  name: string;
  users: number[];
}

export interface TeamStrapiPopulated {
  data: {
    id: number;
    attributes: {
      name: string;
      members: {
        data: TeamMemberStrapiPopulated[];
      };
    };
  };
}

export interface TeamMemberStrapiPopulated {
  id: number;
  attributes: {
    role: string;
    user: UserStrapi;
  };
}
