interface UserRoleStrapiInner {
  id: number;
  attributes: {
    name: string;
  };
}

export interface UserRoleStrapi {
  data: UserRoleStrapiInner | null;
}

export interface UserRoleStrapiList {
  data: UserRoleStrapiInner[];
}
