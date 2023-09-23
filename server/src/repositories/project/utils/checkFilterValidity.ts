import { ProjectFilters } from "@/entities/project";

export const checkFilterValidity = (filters?: ProjectFilters) => {
  if (!filters) return true;

  if (
    filters.dateStart &&
    filters.dateEnd &&
    filters.dateStart > filters.dateEnd
  )
    return false;
  if (
    filters.enrollmentStart &&
    filters.enrollmentEnd &&
    filters.enrollmentStart > filters.enrollmentEnd
  )
    return false;

  return true;
};
