import { ProjectLinkStrapi } from "@/db/strapi/types/components/project-link";

export const getProjectLinkListFromStrapiDTO = (
  dto: ProjectLinkStrapi[]
): { id: number; platform: string; link: string }[] => {
  return dto.map((link) => ({
    id: link.id,
    platform: link.platform.data?.attributes?.name || "",
    link: link.link,
  }));
};
