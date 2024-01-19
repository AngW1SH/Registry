import { User, UserCreate, UserListStrapi, UserStrapi } from "@/entities/user";
import { ServerError } from "@/helpers/errors";
import qs from "qs";

const userRepositoryFactory = () => {
  return Object.freeze({ findOne, create });

  async function findOne(filters: {
    email?: string;
    id?: number;
  }): Promise<User | null> {
    const params = {
      filters: {
        ...(filters.email && { email: filters.email }),
        ...(filters.id && { id: filters.id }),
      },
      fields: ["id", "name", "email"],
    };

    const response: UserListStrapi = await fetch(
      process.env.STRAPI_URL + "students?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.USER_TOKEN!,
        },
      }
    ).then((data) => {
      try {
        return data.json();
      } catch {
        return null;
      }
    });

    if (!response.data || !response.data.length) return null;

    return {
      id: response.data[0].id,
      ...response.data[0].attributes,
    };
  }

  async function create(userCreate: UserCreate): Promise<User | null> {
    const params = {
      data: userCreate,
    };

    const response: UserStrapi = await fetch(
      process.env.STRAPI_URL + "students",
      {
        headers: {
          Authorization: "bearer " + process.env.USER_TOKEN!,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(params),
      }
    ).then((data) => {
      try {
        return data.json();
      } catch {
        return null;
      }
    });

    console.log(response);

    if (!response.data.id) throw new ServerError("User not created");

    return {
      id: response.data.id,
      ...response.data.attributes,
    };
  }
};

const userRepository = userRepositoryFactory();

export default userRepository;
