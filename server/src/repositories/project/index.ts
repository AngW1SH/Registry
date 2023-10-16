import { ProjectFilters, ProjectWithTags } from "@/entities/project";
import { generateProjectFilters } from "./utils/generateProjectFilters";
import { checkFilterValidity } from "./utils/checkFilterValidity";
import qs from "qs";
import { ProjectStrapiPopulated } from "@/entities/project/types/types";
import { RequestListStrapi } from "@/entities/team";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getNew,
    findOne,
    findMany,
    getActiveRequests,
    countActiveRequests,
  });

  async function getNew(limit?: number): Promise<ProjectWithTags[]> {
    const now = new Date();

    const params = {
      sort: ["dateStart:desc"],
      filters: {
        dateEnd: {
          $gte: now,
        },
      },
      fields: [
        "name",
        "description",
        "dateStart",
        "dateEnd",
        "enrollmentStart",
        "enrollmentEnd",
        "supervisor",
      ],
      populate: {
        tags: {
          fields: ["id", "name"],
        },
      },
    };

    const response = await fetch(
      process.env.STRAPI_URL + "projects?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.PROJECTS_TOKEN,
        },
      }
    ).then((data) => data.json());

    const projectsData = response.data;

    return projectsData.map((project) => ({
      id: project.id,
      ...project.attributes,
      tags: project.attributes.tags.data.map((tag) => ({
        id: tag.id,
        ...tag.attributes,
      })),
    }));
  }

  async function countActiveRequests(id: number): Promise<number> {
    const params = {
      filters: {
        id: id,
        requests: {
          team: {
            id: {
              $null: false, // Request has a team attached (this should always be the case, but strapi doesn't provide required relation fields)
            },
            project: {
              id: {
                $null: true, // The team is not working on another project
              },
            },
          },
        },
      },
      populate: {
        requests: {
          count: true,
        },
      },
    };

    const response = await fetch(
      process.env.STRAPI_URL + "projects?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.PROJECTS_TOKEN,
        },
      }
    ).then((data) => data.json());

    if (!response.data.length) return 0;

    return response.data[0].attributes.requests
      ? response.data[0].attributes.requests.data.attributes.count
      : 0;
  }

  async function getActiveRequests(id: number): Promise<RequestListStrapi> {
    const params = {
      filters: {
        id: id,
        requests: {
          team: {
            id: {
              $null: false, // Request has a team attached (this should always be the case, but strapi doesn't provide required relation fields)
            },
            project: {
              id: {
                $null: true, // The team is not working on another project
              },
            },
          },
        },
      },
      fields: ["id"],
      populate: {
        requests: {
          populate: {
            team: {
              populate: {
                members: {
                  populate: {
                    user: {
                      fields: ["id", "name", "email"],
                    },
                  },
                },
                administrators: {
                  fields: ["id", "name", "email"],
                },
              },
            },
          },
        },
      },
    };

    const response = await fetch(
      process.env.STRAPI_URL + "projects?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.PROJECTS_TOKEN,
        },
      }
    ).then((data) => data.json());

    return response.data.length
      ? response.data[0].attributes.requests
      : { data: [] };
  }

  async function findOne(id: number): Promise<ProjectStrapiPopulated> {
    if (typeof id != "number") throw new Error("Provided ID is not a number");

    const params = {
      filters: {
        id: id,
      },
      populate: {
        tags: {
          fields: ["id", "name"],
        },
        team: {
          populate: {
            members: {
              populate: {
                user: {
                  fields: ["id", "name", "email"],
                },
              },
            },
          },
        },
        developerRequirements: {
          populate: {
            fields: ["name"],
          },
        },
        requests: {
          count: true,
        },
      },
    };

    const response = await fetch(
      process.env.STRAPI_URL + "projects?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.PROJECTS_TOKEN,
        },
      }
    ).then((data) => data.json());

    if (!response.data.length) return { data: null };

    const countRequests = await this.countActiveRequests(response.data[0].id);

    response.data[0].attributes.requests.data.attributes.count = countRequests;

    return { data: response.data[0] };
  }

  async function findMany(
    filters?: ProjectFilters
  ): Promise<ProjectWithTags[]> {
    if (!checkFilterValidity(filters)) return [];

    const params = {
      sort: ["dateStart:desc"],
      filters: filters ? generateProjectFilters(filters) : undefined,
      fields: [
        "name",
        "description",
        "dateStart",
        "dateEnd",
        "enrollmentStart",
        "enrollmentEnd",
        "supervisor",
      ],
      populate: {
        tags: {
          fields: ["id", "name"],
        },
      },
    };

    const response = await fetch(
      process.env.STRAPI_URL + "projects?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.PROJECTS_TOKEN,
        },
      }
    ).then((data) => data.json());

    const projectsData = response.data;

    return projectsData.map((project) => ({
      id: project.id,
      ...project.attributes,
      tags: project.attributes.tags.data.map((tag) => ({
        id: tag.id,
        ...tag.attributes,
      })),
    }));
  }
};
const projectRepository = projectRepositoryFactory();
export default projectRepository;
