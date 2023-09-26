import { ProjectFilters } from "@/entities/project";
import { checkFilterValidity } from "./checkFilterValidity";

const generateDateFilters = (
  prefix: string,
  filterStart?: Date,
  filterEnd?: Date
) => {
  if (filterStart && filterEnd)
    return {
      OR: [
        {
          [prefix + "Start"]: {
            lte: filterEnd,
            gte: filterStart,
          },
        },
        {
          [prefix + "End"]: {
            lte: filterEnd,
            gte: filterStart,
          },
        },
        {
          [prefix + "Start"]: {
            lte: filterStart,
          },
          [prefix + "End"]: {
            gte: filterEnd,
          },
        },
      ],
    };

  if (filterStart)
    return {
      [prefix + "End"]: {
        gte: filterStart,
      },
    };

  if (filterEnd)
    return {
      [prefix + "Start"]: {
        lte: filterEnd,
      },
    };

  return {};
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

const generateTagFilters = (tagIds: string[]) => {
  return {
    tags:
      tagIds && tagIds.length
        ? {
            some: {
              tagId: {
                in: tagIds,
              },
            },
          }
        : undefined,
  };
};

export const generateProjectFilters = (filters: ProjectFilters) => {
  const dateFilters = generateDateFilters(
    "date",
    filters.dateStart,
    filters.dateEnd
  );
  const enrollmentFilters = generateDateFilters(
    "enrollment",
    filters.enrollmentStart,
    filters.enrollmentEnd
  );

  return {
    AND: [
      (filters.dateStart || filters.dateEnd) && dateFilters,
      (filters.enrollmentStart || filters.enrollmentEnd) && enrollmentFilters,
      filters.text && generateTextFilters(filters.text),
      filters.tags && generateTagFilters(filters.tags),
    ].filter((elem) => elem),
  };
};
