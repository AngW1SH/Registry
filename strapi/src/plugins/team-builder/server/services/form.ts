import { Strapi } from "@strapi/strapi";
import { formAdapter } from "../entities/Form";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getForms() {
    const forms = await strapi.entityService?.findMany("api::form.form");

    if (!forms) return [];

    return formAdapter(forms as any);
  },
});
