import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin("team-builder")
      .service("myService")
      .getWelcomeMessage();
  },

  async getForms(ctx) {
    ctx.body = await strapi
      .plugin("team-builder")
      .service("myService")
      .getForms();
  },
});
