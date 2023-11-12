export interface TagStrapiInner {
  id: number;
  attributes: {
    name: string;
    projects?: {
      data: {
        attributes: {
          count: number;
        };
      } | null;
    };
  };
}

export interface TagStrapi {
  data: TagStrapiInner;
}

export interface TagListStrapi {
  data: TagStrapiInner[];
}
