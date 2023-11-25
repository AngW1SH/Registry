import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  index(ctx) {
    ctx.body = "";
  },

  async createDraft(ctx) {
    ctx.body = await strapi
      .plugin("team-builder")
      .service("draftService")
      .createDraft();
  },

  async getDrafts(ctx) {
    ctx.body = await strapi
      .plugin("team-builder")
      .service("draftService")
      .getDrafts();
  },

  async getDraftById(ctx) {
    if (!ctx.params.id) throw new Error("No draft id specified");

    ctx.body = await strapi
      .plugin("team-builder")
      .service("draftService")
      .getDraftById(ctx.params.id);
  },

  async saveDraft(ctx) {
    if (!ctx.request.body.draft) throw new Error("No draft to save");

    ctx.body = await strapi
      .plugin("team-builder")
      .service("draftService")
      .saveDraft(ctx.request.body.draft);
  },

  async deleteDraft(ctx) {
    if (!ctx.params.id) throw new Error("No draft to delete");

    ctx.body = await strapi
      .plugin("team-builder")
      .service("draftService")
      .deleteDraft(ctx.params.id);
  },
});
