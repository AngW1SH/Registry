import { ProjectDocumentStrapi } from "@/db/strapi/types/components/project-document";

export const getProjectDocumentListFromStrapiDTO = (
  dto: ProjectDocumentStrapi[]
):
  | {
      id: number;
      name: string;
      category: string;
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
        category: namedFileDTO.type?.data?.attributes.name,
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
