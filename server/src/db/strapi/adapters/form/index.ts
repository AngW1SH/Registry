import { Form } from "@/entities/form";
import { FormListStrapi } from "../../types/form";

export const getFormListFromStrapiDTO = (forms: FormListStrapi): Form[] => {
  return forms.data.map((form) => ({
    id: form.id,
    name: form.attributes.name,
    link: form.attributes.link,
  }));
};
