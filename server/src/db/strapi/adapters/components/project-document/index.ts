import { ProjectDocumentStrapi } from "@/db/strapi/types/components/project-document";

export const getProjectDocumentListFromStrapiDTO = (
  dto: ProjectDocumentStrapi[],
  includeAllDocuments?: boolean
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

  const filtered = (
    includeAllDocuments ? dto : dto.filter((doc) => doc.isPublic)
  ).filter((dto) => dto.file.data);

  return filtered.map((namedFileDTO) => {
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
