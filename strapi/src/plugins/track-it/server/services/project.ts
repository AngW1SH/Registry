import { Strapi } from "@strapi/strapi";
import { projectAdapter } from "../entities/Project";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll() {
    const projects = await strapi.entityService?.findMany(
      "api::project.project"
    );

    if (!projects) return [];

    return projectAdapter(projects as any);
  },
});
