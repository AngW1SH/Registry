import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = "";
  },

  async getForms(ctx) {
    ctx.body = await strapi
      .plugin("form-import")
      .service("formService")
      .getForms();
  },
});
