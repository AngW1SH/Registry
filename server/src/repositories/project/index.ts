import { ProjectFilters, ProjectWithTags } from "@/entities/project";
import { generateProjectFilters } from "./utils/generateProjectFilters";
import { checkFilterValidity } from "./utils/checkFilterValidity";
import { ProjectStrapiPopulated } from "@/entities/project/types/types";
import { RequestListStrapi } from "@/entities/team";
import {
  filterActiveRequests,
  selectRequest,
} from "@/db/strapi/queries/request";
import { selectTeam } from "@/db/strapi/queries/team";
import { selectMember } from "@/db/strapi/queries/member";
import { selectUser } from "@/db/strapi/queries/user";
import {
  selectDeveloperRequirements,
  selectProjectInList,
} from "@/db/strapi/queries/project";
import { selectTag } from "@/db/strapi/queries/tag/selects";
import { strapi } from "@/db/strapi/client";

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
      ...selectProjectInList({
        tags: selectTag(),
      }),
    };

    const response = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

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
        requests: filterActiveRequests(),
      },
      populate: {
        requests: {
          count: true,
        },
      },
    };

    const response = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

    if (!response.data.length) return 0;

    return response.data[0].attributes.requests
      ? response.data[0].attributes.requests.data.attributes.count
      : 0;
  }

  async function getActiveRequests(id: number): Promise<RequestListStrapi> {
    const params = {
      filters: {
        id: id,
        requests: filterActiveRequests(),
      },
      fields: ["id"],
      populate: {
        requests: selectRequest({
          team: selectTeam({
            members: selectMember({
              user: selectUser(),
            }),
            administrators: selectUser(),
          }),
        }),
      },
    };

    const response = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

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
        tags: selectTag(),
        team: selectTeam({
          members: selectMember({
            user: selectUser(),
          }),
        }),
        developerRequirements: selectDeveloperRequirements(),
        requests: {
          count: true,
        },
      },
    };

    const response = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

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

    const response = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

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
