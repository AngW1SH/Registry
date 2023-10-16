import { strapi } from "@/db/strapi/client";
import { selectMember } from "@/db/strapi/queries/member";
import { selectTeam } from "@/db/strapi/queries/team";
import {
  filterUnassigned,
  filterUnassignedAdministrated,
} from "@/db/strapi/queries/team";
import { selectUser } from "@/db/strapi/queries/user";
import { TeamListStrapiPopulated } from "@/db/strapi/types/team";
import { User } from "@/entities/user";

const teamRepositoryFactory = () => {
  return Object.freeze({
    getUnassignedByUser,
    getUnassignedAdministratedByUser,
  });

  async function getUnassignedByUser(
    user: User
  ): Promise<TeamListStrapiPopulated> {
    const params = {
      filters: filterUnassigned(user.id),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

    return response;
  }

  async function getUnassignedAdministratedByUser(
    user: User
  ): Promise<TeamListStrapiPopulated> {
    const params = {
      filters: filterUnassignedAdministrated(user.id),
      ...selectTeam({
        members: selectMember({
          user: selectUser(),
        }),
        administrators: selectUser(),
      }),
    };

    const response = await strapi.get("teams", {
      token: process.env.PROJECTS_TOKEN,
      params,
    });

    return response;
  }
};

const teamRepository = teamRepositoryFactory();

export default teamRepository;
