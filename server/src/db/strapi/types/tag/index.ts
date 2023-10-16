export interface TagStrapiInner {
  id: number;
  attributes: {
    name: string;
  };
}

export interface TagStrapi {
  data: TagStrapiInner;
}

export interface TagListStrapi {
  data: TagStrapiInner[];
}
