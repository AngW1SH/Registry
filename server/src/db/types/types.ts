type NotFunction<T> = T extends Function ? never : T;

export type SelectPopulate<T extends string> = {
  [key in T]?: any;
};

interface IdStrapiInner {
  id: number;
  attributes: {};
}

export interface IdStrapi {
  data: IdStrapiInner | null;
}

export interface IdListStrapi {
  data: IdStrapiInner[];
}
