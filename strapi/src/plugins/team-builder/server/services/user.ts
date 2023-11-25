import { Strapi } from "@strapi/strapi";
import { userAdapter } from "../entities/User";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getUsersByForm(formId: number) {
    const users = await strapi.entityService?.findMany("api::student.student", {
      filters: {
        forms: {
          form: {
            id: formId,
          },
        },
      },
      populate: {
        forms: {
          populate: {
            file: true,
            form: true,
          },
        },
      },
    });

    return userAdapter(users as any, formId);
  },
});
