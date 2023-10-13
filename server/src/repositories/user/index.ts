import { User, UserCreate, UserListStrapi, UserStrapi } from "@/entities/user";
import { flattenUser } from "@/entities/user";
import qs from "qs";

const userRepositoryFactory = () => {
  return Object.freeze({
    findByEmail,
    findById,
    create,
  });

  async function findByEmail(email: string): Promise<User> {
    const params = {
      fields: ["id", "name", "email"],
      filters: {
        email: email,
      },
    };

    const response: UserListStrapi = await fetch(
      process.env.STRAPI_URL + "students?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.USER_TOKEN,
        },
      }
    ).then((data) => data.json());

    if (!response.data || !response.data.length) return null;

    return flattenUser(response.data[0]);
  }

  async function findById(id: number): Promise<User> {
    const params = {
      fields: ["id", "name", "email"],
      filters: {
        id: id,
      },
    };

    const response: UserListStrapi = await fetch(
      process.env.STRAPI_URL + "students?" + qs.stringify(params),
      {
        headers: {
          Authorization: "bearer " + process.env.USER_TOKEN,
        },
      }
    ).then((data) => data.json());

    if (!response.data || !response.data.length) return null;

    return flattenUser(response.data[0]);
  }

  async function create(userCreate: UserCreate): Promise<User> {
    const params = {
      data: userCreate,
    };

    const response: UserStrapi = await fetch(
      process.env.STRAPI_URL + "students",
      {
        headers: {
          Authorization: "bearer " + process.env.USER_TOKEN,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(params),
      }
    ).then((data) => data.json());

    if (!response.data.id) throw new Error("User not created");

    return flattenUser(response.data);
  }
};

const userRepository = userRepositoryFactory();

export default userRepository;
