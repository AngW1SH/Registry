export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserCreate = Omit<User, "id">;

interface UserStrapiInner {
  id: number;
  attributes: {
    name: string;
    email: string;
  };
}

export interface UserStrapi {
  data: UserStrapiInner;
}

export interface UserListStrapi {
  data: UserStrapiInner[];
}
