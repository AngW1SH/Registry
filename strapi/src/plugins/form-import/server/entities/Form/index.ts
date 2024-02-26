export interface Form {
  id: number;
  name: string;
  formId: string;
  type: string;
  link: string;
  identifiers: {
    provider: string;
    question: string;
  }[];
}

export interface FormStrapi {
  id: number;
  active: boolean;
  createdAt: string;
  formId: string;
  name: string;
  link: string;
  type: string;
  publishedAt: string;
  updatedAt: string;
  identifiers: {
    provider: string;
    question: string;
  }[];
}

export const formAdapter = <T extends Form>(formListStrapi: T[]): Form[] => {
  return formListStrapi.map((formStrapi) => ({
    id: formStrapi.id,
    name: formStrapi.name,
    type: formStrapi.type,
    link: formStrapi.link,
    formId: formStrapi.formId,
    identifiers: formStrapi.identifiers,
  }));
};
