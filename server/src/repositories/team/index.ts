import {
  getTeamFromStrapiDTO,
  getTeamListFromStrapiDTO,
} from "@/db/strapi/adapters/team";
import { getUserFromStrapiDTO } from "@/db/strapi/adapters/user";
import { strapi } from "@/db/strapi/client";
import { selectMember } from "@/db/strapi/queries/member";
import { selectTeam } from "@/db/strapi/queries/team";
import {
  filterUnassigned,
  filterUnassignedAdministrated,
} from "@/db/strapi/queries/team";
import { selectUser } from "@/db/strapi/queries/user";
import {
  TeamListStrapiPopulated,
  TeamStrapiPopulated,
  TeamStrapiPopulatedWithAdministrators,
} from "@/db/strapi/types/team";
import { Team } from "@/entities/team";
import { User } from "@/entities/user";

const teamRepositoryFactory = () => {
  return Object.freeze({
    getUnassignedByUser,
    getAdministrators,
    getUnassignedAdministratedByUser,
  });

  async function getUnassignedByUser(user: User): Promise<Team[]> {
    const params = {
      filters: filterUnassigned(user.id),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response: TeamListStrapiPopulated = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

    return getTeamListFromStrapiDTO(response).teams;
  }

  async function getAdministrators(id: number): Promise<User[]> {
    const params = {
      ...selectTeam({
        administrators: selectUser(),
      }),
    };

    const response: TeamStrapiPopulatedWithAdministrators | { data: null } =
      await strapi.get("teams/" + id, {
        token: process.env.PROJECTS_TOKEN,
        params,
      });

    if (
      !response.data ||
      !response.data.attributes.administrators ||
      !response.data.attributes.administrators.data
    )
      return [];

    return response.data.attributes.administrators.data.map((administrator) =>
      getUserFromStrapiDTO({ data: administrator })
    );
  }

  async function getUnassignedAdministratedByUser(user: User): Promise<Team[]> {
    const params = {
      filters: filterUnassignedAdministrated(user.id),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response: TeamListStrapiPopulated = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

    return getTeamListFromStrapiDTO(response).teams;
  }
};

const teamRepository = teamRepositoryFactory();

export default teamRepository;
