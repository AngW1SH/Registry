import { getFormListFromStrapiDTO } from "@/db/strapi/adapters/form";
import { strapi } from "@/db/strapi/client";
import { FormListStrapi } from "@/db/strapi/types/form";
import { Form } from "@/entities/form";
import { ServerError } from "@/helpers/errors";

const formRepositoryFactory = () => {
  return {
    findOne,
    findMany,
  };

  async function findMany(filters: {
    formId?: string;
    active?: boolean;
  }): Promise<Form[]> {
    const params = {
      filters: {
        ...(filters.formId && { formId: filters.formId }),
        ...(filters.active && { active: filters.active }),
      },
      fields: ["id", "name", "link"],
    };

    const response: FormListStrapi = await strapi.get("forms", {
      token: process.env.FORM_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch forms");

    return getFormListFromStrapiDTO(response);
  }

  async function findOne(filters: {
    formId?: string;
    active?: boolean;
  }): Promise<Form | null> {
    const forms = await findMany(filters);

    if (!forms.length) return null;

    return forms[0];
  }
};

const formRepository = formRepositoryFactory();

export default formRepository;
