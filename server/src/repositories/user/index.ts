import { getUserFromStrapiDTO } from "@/db/strapi/adapters/user";
import { strapi } from "@/db/strapi/client";
import { selectUser } from "@/db/strapi/queries/user";
import { UserListStrapi, UserStrapi } from "@/db/strapi/types/user";
import { User, UserCreate } from "@/entities/user";
import { BadRequestError, ServerError } from "@/helpers/errors";

const userRepositoryFactory = () => {
  return Object.freeze({
    findOne,
    create,
    edit,
  });

  async function findOne(filters: {
    email?: string;
    id?: number;
  }): Promise<User | null> {
    const params = {
      filters: {
        ...(filters.email && { email: filters.email }),
        ...(filters.id && { id: filters.id }),
      },
      ...selectUser(),
    };

    const response: UserListStrapi = await strapi.get("students", {
      token: process.env.USER_TOKEN!,
      params,
    });

    if (!response.data || !response.data.length) return null;

    return getUserFromStrapiDTO({ data: response.data[0] });
  }

  async function create(userCreate: UserCreate): Promise<User | null> {
    const params = {
      data: userCreate,
    };

    const response: UserStrapi = await strapi.post("students", {
      token: process.env.USER_TOKEN!,
      body: params,
    });

    if (!response.data.id) throw new ServerError("User not created");

    return getUserFromStrapiDTO(response);
  }

  async function edit(
    data: {
      name?: string;
      email?: string;
      phone?: string;
    },
    userId: number
  ) {
    if (!userId) throw new BadRequestError("User id not specified");

    const params = {
      data,
    };

    const response: UserStrapi = await strapi.put(`students/${userId}`, {
      token: process.env.USER_TOKEN!,
      body: params,
    });

    return getUserFromStrapiDTO(response);
  }
};

const userRepository = userRepositoryFactory();

export default userRepository;
