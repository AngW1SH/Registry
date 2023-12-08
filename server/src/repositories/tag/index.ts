import { getTagListFromStrapiDTO } from "@/db/strapi/adapters/tag";
import { strapi } from "@/db/strapi/client";
import { selectTag } from "@/db/strapi/queries/tag/selects";
import { TagListStrapi } from "@/db/strapi/types/tag";
import { Tag } from "@/entities/tag";
import { ServerError } from "@/helpers/errors";

const tagRepositoryFactory = () => {
  return Object.freeze({
    findMany,
  });

  async function findMany(options?: {
    limit?: number;
    query?: string;
  }): Promise<Tag[]> {
    const params = {
      filters: {
        ...(options &&
          options.query && {
            name: { $containsi: options.query.toLocaleLowerCase() },
          }),
      },
      ...(options && options.limit && { pagination: { limit: options.limit } }),
      ...selectTag(),
    };

    const result: TagListStrapi = await strapi.get("tags", {
      token: process.env.PROJECTS_TOKEN!,
      params,
    });

    if (!result) throw new ServerError("Couldn't fetch tags");

    if (!result.data) return [];

    return getTagListFromStrapiDTO(result);
  }
};

const tagRepository = tagRepositoryFactory();

export default tagRepository;
