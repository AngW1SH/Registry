import { Platform } from "@/entities/platform";
import { PlatformListStrapi, PlatformStrapi } from "../../types/platform";

export const getPlatformFromStrapiDTO = (
  dto: PlatformStrapi
): Platform | null => {
  if (!dto.data) return null;

  return { id: dto.data.id, name: dto.data.attributes.name };
};

export const getPlatformListFromStrapiDTO = (
  dto: PlatformListStrapi
): Platform[] | null => {
  if (!dto.data) return null;

  return dto.data.map((platform) => ({
    id: platform.id,
    name: platform.attributes.name,
  }));
};
