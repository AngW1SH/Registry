import { getFormListFromStrapiDTO } from "@/db/strapi/adapters/form";
import { strapi } from "@/db/strapi/client";
import { FormListStrapi } from "@/db/strapi/types/form";
import { Form } from "@/entities/form";

const formRepositoryFactory = () => {
  return {
    findByFormId,
    findActive,
  };

  async function findByFormId(formId: string) {
    const params = {
      filters: {
        formId: formId,
      },
      fields: ["id"],
    };

    const response = await strapi.get("forms", {
      token: process.env.FORM_TOKEN!,
      params,
    });

    return response;
  }

  async function findActive(): Promise<Form[]> {
    const params = {
      filters: {
        active: true,
      },
      fields: ["id", "name", "link"],
    };

    const result: FormListStrapi = await strapi.get("forms", {
      token: process.env.FORM_TOKEN!,
      params,
    });

    return getFormListFromStrapiDTO(result);
  }
};

const formRepository = formRepositoryFactory();

export default formRepository;
