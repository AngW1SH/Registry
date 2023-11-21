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

  async getStudents(ctx) {
    if (!ctx.params || !ctx.params.formId) return (ctx.body = []);

    ctx.body = await strapi
      .plugin("team-builder")
      .service("myService")
      .getStudents(ctx.params.formId);
  },

  async generateTeams(ctx) {
    if (!ctx.request.body.teams) return (ctx.body = 0);

    ctx.body = await strapi
      .plugin("team-builder")
      .service("myService")
      .generateTeams(ctx.request.body.teams);
  },

  async createDraft(ctx) {
    ctx.body = await strapi
      .plugin("team-builder")
      .service("myService")
      .createDraft();
  },

  async getDrafts(ctx) {
    ctx.body = await strapi
      .plugin("team-builder")
      .service("myService")
      .getDrafts();
  },
});
