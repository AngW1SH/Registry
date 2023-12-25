interface PlatformStrapiInner {
  id: number;
  attributes: {
    name: string;
  };
}

export interface PlatformStrapi {
  data: PlatformStrapiInner | null;
}

export interface PlatformListStrapi {
  data: PlatformStrapiInner[];
}
