export interface UserStrapiInner {
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

export interface User {
  id: number;
  name: string;
  email: string;
}
