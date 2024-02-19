interface FormStrapiInner {
  id: number;
  attributes: {
    name: string;
    link: string;
    type: string;
    identifiers: {
      provider: string;
      question: string;
    }[];
  };
}

export interface FormStrapi {
  data: FormStrapiInner | null;
}

export interface FormListStrapi {
  data: FormStrapiInner[];
}
