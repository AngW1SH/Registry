import { NamedFileStrapi } from "@/db/strapi/types/components/named-file";

export const getNamedFileListFromStrapiDTO = (
  dto: NamedFileStrapi[]
): { id: number; name: string; url: string }[] => {
  return dto
    .filter((namedFileDTO) => namedFileDTO.file.data)
    .map((namedFileDTO) => {
      return {
        id: namedFileDTO.id,
        name: namedFileDTO.name,
        url: namedFileDTO.file.data.attributes.url,
      };
    });
};
