import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = "";
  },

  async generateTeams(ctx) {
    if (!ctx.request.body.teams) return (ctx.body = 0);

    ctx.body = await strapi
      .plugin("team-builder")
      .service("teamDraftService")
      .generateTeams(ctx.request.body.teams);
  },

  async autogenerate(ctx) {
    if (!ctx.request.body.users) return (ctx.body = 0);

    ctx.body = await strapi
      .plugin("team-builder")
      .service("autogenerateService")
      .autogenerate(ctx.request.body.users);
  },
});
