import { prisma } from "@/db/prisma-client";
import { ProjectFilters, ProjectWithTags } from "@/entities/project";
import { Tag } from "@/entities/tag";
import { generateProjectFilters } from "./utils/generateProjectFilters";
import { checkFilterValidity } from "./utils/checkFilterValidity";
import qs from "qs";
import { ProjectStrapiPopulated } from "@/entities/project/types/types";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getNew,
    findOne,
    findMany,
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
        "developerRequirements",
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
        "developerRequirements",
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
