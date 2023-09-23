import { ProjectFilters } from "@/entities/project";
import { checkFilterValidity } from "./checkFilterValidity";

const generateDateFilters = (filterStart?: Date, filterEnd?: Date) => {
  return {
    dateStart: filterEnd
      ? {
          lte: filterEnd,
        }
      : undefined,
    dateEnd: filterStart
      ? {
          lte: filterStart,
        }
      : undefined,
  };
};

const generateTextFilters = (text: string) => {
  return {
    OR: [
      {
        name: {
          contains: text,
        },
      },
      {
        description: {
          contains: text,
        },
      },
      {
        developerRequirements: {
          contains: text,
        },
      },
    ],
  };
};

export const generateProjectFilters = (filters: ProjectFilters) => {
  const dateFilters = generateDateFilters(filters.dateStart, filters.dateEnd);
  const enrollmentFilters = generateDateFilters(
    filters.dateStart,
    filters.dateEnd
  );

  return {
    AND: [
      (filters.dateStart || filters.dateEnd) && dateFilters,
      (filters.enrollmentStart || filters.enrollmentEnd) && enrollmentFilters,
      filters.text && generateTextFilters(filters.text),
    ].filter((elem) => elem),
  };
};
