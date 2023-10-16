import { strapi } from "@/db/strapi/client";
import { selectUser } from "@/db/strapi/queries/user";
import { User, UserCreate, UserListStrapi, UserStrapi } from "@/entities/user";
import { flattenUser } from "@/entities/user";

const userRepositoryFactory = () => {
  return Object.freeze({
    findByEmail,
    findById,
    create,
  });

  async function findByEmail(email: string): Promise<User> {
    const params = {
      filters: {
        email: email,
      },
      ...selectUser(),
    };

    const response: UserListStrapi = await strapi.get("students", {
      token: process.env.USER_TOKEN,
      params,
    });

    if (!response.data || !response.data.length) return null;

    return flattenUser(response.data[0]);
  }

  async function findById(id: number): Promise<User> {
    const params = {
      filters: {
        id: id,
      },
      ...selectUser(),
    };

    const response: UserListStrapi = await strapi.get("students", {
      token: process.env.USER_TOKEN,
      params,
    });

    if (!response.data || !response.data.length) return null;

    return flattenUser(response.data[0]);
  }

  async function create(userCreate: UserCreate): Promise<User> {
    const params = {
      data: userCreate,
    };

    const response: UserStrapi = await strapi.post("students", {
      token: process.env.USER_TOKEN,
      body: params,
    });

    if (!response.data.id) throw new Error("User not created");

    return flattenUser(response.data);
  }
};

const userRepository = userRepositoryFactory();

export default userRepository;
