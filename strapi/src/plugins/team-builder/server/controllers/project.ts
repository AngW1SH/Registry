import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = "";
  },

  async getProjects(ctx) {
    ctx.body = await strapi
      .plugin("team-builder")
      .service("projectService")
      .getUnassignedProjects();
  },
});
