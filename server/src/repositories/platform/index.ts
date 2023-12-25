import { getPlatformFromStrapiDTO } from "@/db/strapi/adapters/platform";
import { strapi } from "@/db/strapi/client";
import { PlatformListStrapi } from "@/db/strapi/types/platform";
import { Platform } from "@/entities/platform";

const platformRepositoryFactory = () => {
  return Object.freeze({
    findOne,
    findMany,
  });

  async function findOne(filters?: {
    name?: string;
  }): Promise<Platform | null> {
    const params = {
      filters: filters
        ? {
            ...(filters.name ? { name: { $eqi: filters.name } } : {}),
          }
        : undefined,
      fields: ["name"],
    };

    const result: PlatformListStrapi = await strapi.get("platforms", {
      token: process.env.PLATFORM_TOKEN!,
      params,
    });

    if (!result.data) return null;

    return getPlatformFromStrapiDTO({ data: result.data[0] });
  }
  async function findMany(filters?: { name?: string }) {}
};

const platformRepository = platformRepositoryFactory();

export default platformRepository;
