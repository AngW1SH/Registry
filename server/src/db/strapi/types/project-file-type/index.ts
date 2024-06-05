interface ProjectFileTypeStrapiInner {
  id: number;
  attributes: {
    name: string;
    isPublic?: boolean;
  };
}

export interface ProjectFileTypeStrapi {
  data: ProjectFileTypeStrapiInner | null;
}

export interface ProjectFileTypeListStrapi {
  data: ProjectFileTypeStrapiInner[];
}
