import { ProjectFilters, ProjectFiltersDTO } from "../types/types";

export const getProjectFiltersFromDTO = (
  filtersDTO: ProjectFiltersDTO
): ProjectFilters | undefined => {
  if (!filtersDTO) return;

  return {
    ...filtersDTO,
    dateStart: filtersDTO.dateStart ? new Date(filtersDTO.dateStart) : null,
    dateEnd: filtersDTO.dateEnd ? new Date(filtersDTO.dateEnd) : null,
    enrollmentStart: filtersDTO.enrollmentStart
      ? new Date(filtersDTO.enrollmentStart)
      : null,
    enrollmentEnd: filtersDTO.enrollmentEnd
      ? new Date(filtersDTO.enrollmentEnd)
      : null,
  };
};
