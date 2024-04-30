import { Strapi } from "@strapi/strapi";
import { projectAdapter } from "../entities/Project";
import { createImportResource } from "./utils/createImportResource";
import { createImportMember } from "./utils/createImportMember";

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
    const project: any = await strapi.entityService?.findOne(
      "api::project.project",
      id,
      {
        fields: ["id", "name", "description", "dateStart", "dateEnd"],
        populate: {
          providers: true,
          teams: {
            fields: ["id", "name"],
            populate: {
              members: {
                fields: ["id"],
                populate: {
                  roles: {
                    fields: ["id", "name"],
                  },
                  user: {
                    fields: ["id", "name"],
                    populate: {
                      services: {
                        fields: ["id", "provider", "value"],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }
    );

    if (!project) return;

    const members = project.teams.reduce(
      (acc, cur) => [...acc, ...cur.members],
      []
    );

    const importMembers = members.map((member) => createImportMember(member));
    const importResources = project.providers.map((provider) =>
      createImportResource(provider)
    );

    const importProject = {
      name: project.name,
      description:
        project.description.substring(0, 40) +
        (project.description.length > 40 ? "..." : ""),
      resources: importResources,
      members: importMembers,
    };

    const result = await strapi.fetch(
      process.env.METRIC_SERVER_URL + "/import/project",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.METRIC_SERVER_API_TOKEN}`,
        },
        body: JSON.stringify({ data: importProject }),
      }
    );

    if (!result.ok) {
      throw new Error("Failed to import project");
    }

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

    const syncSaveResult = await strapi.db
      ?.query("plugin::track-it.sync-date")
      .create({
        data: {
          project: id,
          date: new Date().toISOString(),
        },
      });

    return syncSaveResult;
  },
});
