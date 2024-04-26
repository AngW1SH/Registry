import { strapi } from "@/db/strapi/client";
import { selectUserRole } from "@/db/strapi/queries/user";
import { UserRoleStrapiList } from "@/db/strapi/types/user-role";
import { ServerError } from "@/helpers/errors";

const userRoleRepositoryFactory = () => {
  return Object.freeze({
    findMany,
  });

  async function findMany(options?: {
    limit?: number;
    query?: string;
  }): Promise<string[]> {
    const params = {
      filters: {
        ...(options &&
          options.query && {
            name: { $containsi: options.query.toLocaleLowerCase() },
          }),
      },
      ...(options && options.limit && { pagination: { limit: options.limit } }),
      ...selectUserRole(),
    };

    const result: UserRoleStrapiList = await strapi.get("user-roles", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!result) throw new ServerError("Couldn't fetch tags");

    if (!result.data) return [];

    return result.data
      .map((item) => item.attributes.name)
      .filter((item) => item);
  }
};

const userRoleRepository = userRoleRepositoryFactory();

export default userRoleRepository;
