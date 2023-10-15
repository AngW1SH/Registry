import { User } from "@/entities/user";
import qs from "qs";

const teamRepositoryFactory = () => {
  return Object.freeze({
    getUnassignedByUser,
    getUnassignedAdministratedByUser,
  });

  async function getUnassignedByUser(user: User) {
    const params = {
      filters: {
        project: {
          id: {
            $null: true,
          },
        },
        members: {
          user: {
            id: user.id,
          },
        },
      },
      populate: {
        members: {
          fields: ["id", "name", "role"],
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
    };

    const response = await fetch(
      process.env.STRAPI_URL + "teams?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.PROJECTS_TOKEN,
        },
      }
    ).then((data) => data.json());

    return response;
  }

  async function getUnassignedAdministratedByUser(user: User) {
    const params = {
      filters: {
        project: {
          id: {
            $null: true,
          },
        },
        administrators: {
          id: user.id,
        },
      },
      populate: {
        members: {
          fields: ["id", "name", "role"],
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
    };

    const response = await fetch(
      process.env.STRAPI_URL + "teams?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.PROJECTS_TOKEN,
        },
      }
    ).then((data) => data.json());

    return response;
  }
};

const teamRepository = teamRepositoryFactory();

export default teamRepository;
