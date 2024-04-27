import { Strapi } from "@strapi/strapi";
import { projectAdapter } from "../entities/Project";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getAll() {
    const projects = await strapi.entityService?.findMany(
      "api::project.project",
      {
        fields: ["id", "name", "dateStart", "dateEnd"],
      }
    );

    if (!projects) return [];

    return projectAdapter(projects as any);
  },
});
