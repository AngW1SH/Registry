import { getFormListFromStrapiDTO } from "@/db/strapi/adapters/form";
import { getUserFormResultsFromStrapiDTO } from "@/db/strapi/adapters/user";
import { strapi } from "@/db/strapi/client";
import { selectFormResult } from "@/db/strapi/queries/components/form-result";
import { FormListStrapi } from "@/db/strapi/types/form";
import { Form, FormResult } from "@/entities/form";
import uploadRepository from "../upload";

const formRepositoryFactory = () => {
  return {
    findOne,
    findMany,
    findResults,
    submit,
  };

  async function findMany(filters: {
    formId?: number;
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

    return getFormListFromStrapiDTO(response);
  }

  async function findOne(filters: {
    formId?: number;
    active?: boolean;
  }): Promise<Form | null> {
    const forms = await findMany(filters);

    if (!forms.length) return null;

    return forms[0];
  }

  async function findResults(userId: number): Promise<FormResult[]> {
    const params = {
      populate: {
        forms: selectFormResult(),
      },
    };

    const response = await strapi.get("students/" + userId, {
      token: process.env.USER_TOKEN!,
      params,
    });

    return getUserFormResultsFromStrapiDTO(response);
  }

  async function submit(formId: number, response: any, userId: number) {
    const forms: FormResult[] = await findResults(userId);

    const fileUploadResponse = await uploadRepository.upload({
      data: JSON.stringify(response),
      name: userId + "-" + formId + "-" + new Date().toTimeString() + ".json",
    });

    const body = {
      data: {
        forms: [
          ...forms,
          {
            form: { connect: [{ id: formId }] },
            date: new Date(),
            file: fileUploadResponse[0] ? fileUploadResponse[0].id : null,
          },
        ],
      },
    };

    const createResponse = await strapi.put("students/" + userId, {
      token: process.env.USER_TOKEN!,
      body,
    });

    return 1;
  }
};

const formRepository = formRepositoryFactory();

export default formRepository;
