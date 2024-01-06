export interface Form {
  id: number;
  name: string;
  formId: string;
  type: string;
  link: string;
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
}

export const formAdapter = <T extends Form>(formListStrapi: T[]): Form[] => {
  return formListStrapi.map((formStrapi) => ({
    id: formStrapi.id,
    name: formStrapi.name,
    type: formStrapi.type,
    link: formStrapi.link,
    formId: formStrapi.formId,
  }));
};
