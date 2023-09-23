import { ProjectFilters } from "@/entities/project";
import { checkFilterValidity } from "./checkFilterValidity";

const generateDateFilters = (filterStart?: Date, filterEnd?: Date) => {
  if (filterStart && filterEnd)
    return {
      OR: [
        {
          dateStart: {
            lte: filterEnd,
            gte: filterStart,
          },
        },
        {
          dateEnd: {
            lte: filterEnd,
            gte: filterStart,
          },
        },
        {
          dateStart: {
            lte: filterStart,
          },
          dateEnd: {
            gte: filterEnd,
          },
        },
      ],
    };

  if (filterStart)
    return {
      dateEnd: {
        gte: filterStart,
      },
    };

  if (filterEnd)
    return {
      dateStart: {
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
      filters.tags && generateTagFilters(filters.tags),
    ].filter((elem) => elem),
  };
};
