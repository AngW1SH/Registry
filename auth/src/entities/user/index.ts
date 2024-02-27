export interface User {
  id: number;
  name: string;
  services: {
    provider: string;
    value: string;
  }[];
}

export type UserCreate = Omit<User, "id">;

interface UserStrapiInner {
  id: number;
  attributes: {
    name: string;
    services: {
      provider: string;
      value: string;
    }[];
  };
}

export interface UserStrapi {
  data: UserStrapiInner;
}

export interface UserListStrapi {
  data: UserStrapiInner[];
}

export const staticUser = {
  id: 2,
  name: "Сатурнова Татьяна Тимофеевна ",
  email: "st072603@student.spbu.ru",
};
