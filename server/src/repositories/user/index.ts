import {
  getUserFormResultsFromStrapiDTO,
  getUserFromStrapiDTO,
} from "@/db/strapi/adapters/user";
import { strapi } from "@/db/strapi/client";
import { selectFormResult } from "@/db/strapi/queries/components/form-result";
import { selectUser } from "@/db/strapi/queries/user";
import { UserListStrapi, UserStrapi } from "@/db/strapi/types/user";
import { FormResult } from "@/entities/form";
import { User, UserCreate } from "@/entities/user";
import { ServerError } from "@/helpers/errors";

const userRepositoryFactory = () => {
  return Object.freeze({
    findOne,
    create,
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
};

const userRepository = userRepositoryFactory();

export default userRepository;
