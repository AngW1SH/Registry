interface ProjectFileTypeStrapiInner {
  id: number;
  attributes: {
    name: string;
  };
}

export interface ProjectFileTypeStrapi {
  data: ProjectFileTypeStrapiInner | null;
}

export interface ProjectFileTypeListStrapi {
  data: ProjectFileTypeStrapiInner[];
}
