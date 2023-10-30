import { NamedFileStrapi } from "@/db/strapi/types/components/named-file";

const mimeToDisplayType = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "application/pdf": "PDF",
  "application/msword": "DOC",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "DOCX",
  "text/plain": "TXT",
};

export const getNamedFileListFromStrapiDTO = (
  dto: NamedFileStrapi[]
):
  | { id: number; name: string; url: string; type: string; size: string }[]
  | null => {
  if (!dto) return null;

  return dto
    .filter((namedFileDTO) => namedFileDTO.file.data)
    .map((namedFileDTO) => {
      return {
        id: namedFileDTO.id,
        name: namedFileDTO.name,
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
