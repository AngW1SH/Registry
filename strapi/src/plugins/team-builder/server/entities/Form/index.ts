export interface Form {
  id: number;
  name: string;
}

export interface FormStrapi {
  id: number;
  active: boolean;
  createdAt: string;
  formId: string;
  name: string;
  publishedAt: string;
  updatedAt: string;
}

export const formAdapter = <T extends Form>(formListStrapi: T[]): Form[] => {
  return formListStrapi.map((formStrapi) => ({
    id: formStrapi.id,
    name: formStrapi.name,
  }));
};
