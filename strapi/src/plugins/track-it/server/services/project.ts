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

    const syncDates = await strapi.db
      ?.query("plugin::track-it.sync-date")
      .findMany({
        populate: {
          project: {
            fields: ["id", "name"],
          },
        },
      });

    syncDates?.forEach((date) => {
      const project = (projects as any)?.find(
        (project) => project.id === date?.project?.id
      );

      if (project) {
        project.syncDate = date.date;
      }
    });

    if (!projects) return [];

    return projectAdapter(projects as any);
  },

  async update(id: number) {
    const found = await strapi.db?.query("plugin::track-it.sync-date").findOne({
      where: {
        project: id,
      },
    });

    if (found) {
      const result = await strapi.db
        ?.query("plugin::track-it.sync-date")
        .update({
          where: {
            project: id,
          },
          data: {
            date: new Date().toISOString(),
          },
        });

      return result;
    }

    const result = await strapi.db?.query("plugin::track-it.sync-date").create({
      data: {
        project: id,
        date: new Date().toISOString(),
      },
    });

    return result;
  },
});
