import {
  getTeamFromStrapiDTO,
  getTeamListFromStrapiDTO,
} from "@/db/strapi/adapters/team";
import { getUserFromStrapiDTO } from "@/db/strapi/adapters/user";
import { strapi } from "@/db/strapi/client";
import { selectMember } from "@/db/strapi/queries/member";
import { selectRequest } from "@/db/strapi/queries/request";
import { filterActive, selectTeam } from "@/db/strapi/queries/team";
import {
  filterUnassigned,
  filterUnassignedAdministrated,
} from "@/db/strapi/queries/team";
import { filterAdministratedActive } from "@/db/strapi/queries/team/filters";
import { selectUser } from "@/db/strapi/queries/user";
import { TeamListStrapi, TeamStrapi } from "@/db/strapi/types/team";
import { UserStrapi } from "@/db/strapi/types/user";
import { Member } from "@/entities/member";
import { Project } from "@/entities/project";
import { Request } from "@/entities/request";
import { Team } from "@/entities/team";
import { User } from "@/entities/user";
import { ServerError } from "@/helpers/errors";

const teamRepositoryFactory = () => {
  return Object.freeze({
    findOne,
    findMany,
    getUnassigned,
    getAdministrators,
    getUnassignedAdministrated,
    getActive,
    getAdministratedActive,
  });

  async function findOne(filters: {
    member?: number;
    administrator?: number;
    includeAllDocuments?: boolean;
    id?: number;
  }) {
    const findManyResult = await findMany(filters);

    return findManyResult.teams.length ? findManyResult : null;
  }

  async function findMany(filters: {
    member?: number;
    administrator?: number;
    includeAllDocuments?: boolean;
    id?: number;
  }) {
    const params = {
      filters: {
        ...(filters &&
          filters.id && {
            id: filters.id,
          }),
        ...(filters &&
          filters.member && {
            members: {
              id: filters.member,
            },
          }),
        ...(filters &&
          filters.administrator && {
            administrators: {
              id: filters.administrator,
            },
          }),
      },
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response: TeamListStrapi = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch teams");

    return getTeamListFromStrapiDTO(response, {
      includeAdmin: true,
      includeAllDocuments: filters.includeAllDocuments,
    });
  }

  async function getUnassigned(userId: number): Promise<Team[]> {
    const params = {
      filters: filterUnassigned(userId),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response: TeamListStrapi = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!response) throw new ServerError("Couldn't fetch unassigned teams");

    return getTeamListFromStrapiDTO(response).teams!;
  }

  async function getAdministrators(id: number): Promise<User[]> {
    const params = {
      ...selectTeam({
        administrators: selectUser(),
      }),
    };

    const response: TeamStrapi | { data: null } = await strapi.get(
      "teams/" + id,
      {
        token: process.env.PROJECTS_TOKEN!,
        params,
      }
    );

    if (!response) throw new ServerError("Couldn't fetch team");

    if (
      !response.data ||
      !response.data.attributes.administrators ||
      !response.data.attributes.administrators.data
    )
      return [];

    return response.data.attributes.administrators.data.map((administrator) =>
      getUserFromStrapiDTO({ data: administrator } as UserStrapi)
    );
  }

  async function getAdministratedActive(
    userId: number,
    options?: { includeAdmin?: boolean; includeAllDocuments?: boolean }
  ): Promise<{
    teams: Team[] | null;
    members: Member[] | null;
    users: User[] | null;
  }> {
    const params = {
      filters: filterAdministratedActive(userId),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
      }),
    };

    const response: TeamListStrapi = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });
    if (!response) throw new ServerError("Couldn't fetch teams");

    return getTeamListFromStrapiDTO(response, options);
  }

  async function getUnassignedAdministrated(userId: number): Promise<Team[]> {
    const params = {
      filters: filterUnassignedAdministrated(userId),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response: TeamListStrapi = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });
    if (!response) throw new ServerError("Couldn't fetch teams");

    return getTeamListFromStrapiDTO(response).teams!;
  }

  async function getActive(
    userId: number,
    options?: { includeAdmin?: boolean; includeAllDocuments?: boolean }
  ): Promise<{
    teams: Team[] | null;
    members: Member[] | null;
    users: User[] | null;
    administrators: User[] | null;
    requests: Request[] | null;
  }> {
    const params = {
      filters: filterActive(userId),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response: TeamListStrapi = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });
    if (!response) throw new ServerError("Couldn't fetch teams");

    return getTeamListFromStrapiDTO(response, options);
  }
};

const teamRepository = teamRepositoryFactory();

export default teamRepository;
