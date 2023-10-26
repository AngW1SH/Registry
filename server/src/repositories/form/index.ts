import { strapi } from "@/db/strapi/client";

const formRepositoryFactory = () => {
  return {
    findByFormId,
  };

  async function findByFormId(formId: string) {
    const params = {
      filters: {
        formId: formId,
      },
      fields: ["id"],
    };

    const response = await strapi.get("forms", {
      token: process.env.FORM_TOKEN,
      params,
    });

    return response;
  }
};

const formRepository = formRepositoryFactory();

export default formRepository;
