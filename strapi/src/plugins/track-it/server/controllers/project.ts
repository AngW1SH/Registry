import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = "";
  },

  async getAll(ctx) {
    ctx.body = await strapi
      .plugin("track-it")
      .service("projectService")
      .getAll();
  },
});
