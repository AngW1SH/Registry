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
    services?: {
      provider: string;
      value: string;
    }[];
  }): Promise<User | null> {
    const params = {
      filters: {
        ...(filters.email && {
          services: {
            provider: "spbu",
            value: filters.email.split("@")[0],
          },
        }),
        ...(filters.id && { id: filters.id }),
        ...(filters.services && {
          services: {
            $or: filters.services.map((service) => ({
              provider: service.provider,
              value: {
                $eqi: service.value,
              },
            })),
          },
        }),
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
    const { email, ...data } = userCreate;

    const params = {
      data: {
        ...data,
        services: [
          {
            provider: "spbu",
            value: email.split("@")[0],
          },
        ],
      },
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

    const userResponse: UserStrapi = await strapi.get(`students/${userId}`, {
      token: process.env.USER_TOKEN!,
      params: {
        ...selectUser(),
      },
    });

    if (!userResponse || !userResponse.data)
      throw new BadRequestError("User with such id not found");

    const { email, ...dataWithoutEmail } = data;

    const services = userResponse.data.attributes.services.map((service) => {
      if (service.provider == "spbu")
        return {
          ...service,
          provider: "spbu",
          value: email?.split("@")[0] || "",
        };

      return service;
    });

    if (!services.find((service) => service.provider == "spbu")) {
      services.push({
        provider: "spbu",
        value: email?.split("@")[0] || "",
      });
    }

    const params = {
      data: {
        ...dataWithoutEmail,
        services: services,
      },
    };

    const response: UserStrapi = await strapi.put(`students/${userId}`, {
      token: process.env.USER_TOKEN!,
      body: params,
    });

    return 1;
  }
};

const userRepository = userRepositoryFactory();

export default userRepository;
