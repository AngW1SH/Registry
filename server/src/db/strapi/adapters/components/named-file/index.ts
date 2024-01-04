import { NamedFileStrapi } from "@/db/strapi/types/components/named-file";
import { mimeToDisplayType } from "@/helpers/mime/mimeToDisplayType";

export const getNamedFileListFromStrapiDTO = (
  dto: NamedFileStrapi[]
):
  | {
      id: number;
      name: string;
      date: string;
      url: string;
      type: string;
      size: string;
    }[]
  | null => {
  if (!dto) return null;

  console.log(
    dto.map((namedFileDTO) =>
      namedFileDTO.file.data?.attributes.name.split(".").pop()
    )
  );

  return dto
    .filter((namedFileDTO) => namedFileDTO.file.data)
    .map((namedFileDTO) => {
      return {
        id: namedFileDTO.id,
        name: namedFileDTO.name,
        date: namedFileDTO.date,
        url: namedFileDTO.file.data?.attributes.url || "",
        type:
          namedFileDTO.file.data?.attributes.name
            .split(".")
            .pop()
            ?.toUpperCase() || "FILE",
        size: parseInt("" + namedFileDTO.file.data?.attributes.size) + "Кб",
      };
    });
};
