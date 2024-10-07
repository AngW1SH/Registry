import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  async getUnassignedProjects() {
    const projects = await strapi.entityService?.findMany(
      "api::project.project",
      {
        filters: {},
        populate: {
          forms: {
            populate: {
              file: true,
              form: true,
            },
          },
        },
      }
    );

    return projects;
  },
});
