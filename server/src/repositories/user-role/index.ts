import meilisearch from "@/db/meilisearch/client";
import { strapi } from "@/db/strapi/client";
import { selectUserRole } from "@/db/strapi/queries/user";
import { UserRoleStrapiList } from "@/db/strapi/types/user-role";
import { ServerError } from "@/helpers/errors";

const userRoleRepositoryFactory = () => {
  return Object.freeze({
    findMany,
    findManyExact,
  });

  async function findMany(options?: {
    limit?: number;
    query?: string;
  }): Promise<string[]> {
    const meiliResult = await meilisearch
      .index("user-role")
      .search(options?.query || "", {
        limit: options?.limit || 5,
      });

    return meiliResult.hits?.map((hit) => hit.name) || [];
  }

  async function findManyExact(roles: string[]): Promise<string[]> {
    if (!roles.length) return [];

    const params = {
      filters: {
        name: {
          $in: roles,
        },
      },
      ...selectUserRole(),
    };

    const result: UserRoleStrapiList = await strapi.get("user-roles", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!result) throw new ServerError("Couldn't fetch user roles");

    if (!result.data) return [];

    return result.data
      .map((item) => item.attributes.name)
      .filter((item) => item);
  }
};

const userRoleRepository = userRoleRepositoryFactory();

export default userRoleRepository;
