import { ProjectFilters } from "@/entities/project";
import { generateProjectFilters } from "./utils/generateProjectFilters";
import { checkFilterValidity } from "./utils/checkFilterValidity";
import { ProjectDTO } from "@/entities/project/types/types";
import { Team } from "@/entities/team";
import { selectTeam } from "@/db/strapi/queries/team";
import { selectMember } from "@/db/strapi/queries/member";
import { selectUser } from "@/db/strapi/queries/user";
import {
  selectDescriptionFiles,
  selectDeveloperRequirements,
  selectProjectInList,
  selectProjectLinks,
  selectResultFiles,
  selectUserProject,
} from "@/db/strapi/queries/project";
import { selectTag } from "@/db/strapi/queries/tag/selects";
import { strapi } from "@/db/strapi/client";
import { Tag } from "@/entities/tag";
import { ProjectListStrapi } from "@/db/strapi/types/project";
import {
  getProjectFromStrapiDTO,
  getProjectListFromStrapiDTO,
} from "@/db/strapi/adapters/project";
import { User } from "@/entities/user";
import { Member } from "@/entities/member";
import requestRepository from "../request";
import { BadRequestError, ServerError } from "@/helpers/errors";
import meilisearch from "@/db/meilisearch/client";

const projectRepositoryFactory = () => {
  return Object.freeze({
    getNew,
    getAvailable,
    findOne,
    findMany,
    getReferences,
  });

  async function getNew(limit?: number): Promise<{
    projects: ProjectDTO[];
    tags: Tag[];
  } | null> {
    const now = new Date();

    const params = {
      sort: ["dateStart:desc"],
      ...(limit
        ? {
            pagination: {
              limit: limit,
            },
          }
        : {}),
      ...selectProjectInList({
        tags: selectTag(),
      }),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch new projects");

    const { projects, tags } = getProjectListFromStrapiDTO(response);

    return {
      projects: projects!,
      tags: tags!,
    };
  }

  async function getAvailable() {
    const now = new Date();

    const params = {
      sort: ["dateStart:desc"],
      filters: {
        dateStart: {
          $gte: now,
        },
      },
      ...selectProjectInList(),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch available projects");

    const { projects } = getProjectListFromStrapiDTO(response);

    return projects?.filter(
      (project) => project.teamLimit && project.teams.length < project.teamLimit
    );
  }

  async function findOne(
    id: string | number,
    options?: {
      includeAdmin: boolean;
    }
  ): Promise<{
    project: ProjectDTO | null;
    tags: Tag[];
    teams: Team[];
    users: User[];
    members: Member[];
    administrators?: User[];
  } | null> {
    if (typeof id != "string" && typeof id != "number")
      throw new BadRequestError("Provided ID is not a string or a number");

    const params = {
      filters: {
        slug: id,
      },
      populate: {
        tags: selectTag(),
        teams: selectTeam({
          members: selectMember({
            user: selectUser(),
          }),
          ...(options &&
            options.includeAdmin && { administrators: selectUser() }),
        }),
        developerRequirements: selectDeveloperRequirements(),
        requests: {
          count: true,
        },
        descriptionFiles: selectDescriptionFiles(),
        resultFiles: selectResultFiles(),
        projectLink: selectProjectLinks(),
        related: selectProjectInList({
          tags: selectTag(),
        }),
      },
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch project");

    if (!response.data || !response.data.length) return null;

    const countRequests = await requestRepository.countActive({
      project: response.data[0].id,
    });

    if (response.data[0].attributes.requests)
      response.data[0].attributes.requests.data.attributes.count =
        countRequests;

    return getProjectFromStrapiDTO(
      { data: response.data[0] },
      { includeAdmin: true }
    );
  }

  async function findMany(
    filters?: ProjectFilters,
    page = 1
  ): Promise<{
    projects: ProjectDTO[];
    tags: Tag[];
  }> {
    if (!checkFilterValidity(filters)) return { projects: [], tags: [] };

    // Kind of a problem that we will have to fetch all of the projects, without
    // considering that we only need 'pageSize' of them, but there's really
    // nothing I can do about it rn
    const meiliResult =
      filters && filters.text
        ? await meilisearch.index("project").search(filters.text)
        : null;

    const idList = meiliResult
      ? meiliResult.hits.map((hit) => hit.slug)
      : undefined;

    if (idList && !idList.length) return { projects: [], tags: [] };

    const params = {
      sort: ["dateStart:desc", "name"],
      filters: filters ? generateProjectFilters(filters, idList) : undefined,
      ...selectProjectInList({
        tags: selectTag(),
      }),
      pagination: {
        pageSize: 5,
        page: page,
      },
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch projects");

    const { projects, tags } = getProjectListFromStrapiDTO(response);

    return {
      projects: projects!,
      tags: tags!,
    };
  }

  async function getReferences(ids: number[]) {
    if (!ids.length) return [];

    const params = {
      filters: {
        slug: {
          $in: ids,
        },
      },
      ...selectUserProject(),
    };

    const response: ProjectListStrapi = await strapi.get("projects", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch project references");

    return getProjectListFromStrapiDTO(response).projects;
  }
};
const projectRepository = projectRepositoryFactory();
export default projectRepository;
