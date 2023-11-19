import { Strapi } from "@strapi/strapi";
import { FormStrapi, formAdapter } from "../entities/Form";
import { userAdapter } from "../entities/User";

export default ({ strapi }: { strapi: Strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async getForms() {
    const forms = await strapi.entityService?.findMany("api::form.form");

    if (!forms) return [];

    return formAdapter(forms as any);
  },

  async getStudents(formId: number) {
    const students = await strapi.entityService?.findMany(
      "api::student.student",
      {
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
      }
    );

    return userAdapter(students as any, formId);
  },
});
