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

  return dto
    .filter((namedFileDTO) => namedFileDTO.file.data)
    .map((namedFileDTO) => {
      return {
        id: namedFileDTO.id,
        name: namedFileDTO.name,
        date: namedFileDTO.date,
        url: namedFileDTO.file.data?.attributes.url || "",
        type: Object.keys(mimeToDisplayType).includes(
          namedFileDTO.file.data?.attributes.mime!
        )
          ? (mimeToDisplayType[
              namedFileDTO.file.data?.attributes
                .mime as keyof typeof mimeToDisplayType
            ] as string)
          : "FILE",
        size: parseInt("" + namedFileDTO.file.data?.attributes.size) + "Кб",
      };
    });
};
