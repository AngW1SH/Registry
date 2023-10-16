import { ProjectFilters } from "@/entities/project";

const generateDateFilters = (
  prefix: string,
  filterStart?: Date,
  filterEnd?: Date
) => {
  if (
    filterStart &&
    typeof filterStart != "string" &&
    !filterStart.toDateString
  )
    return {};

  if (filterEnd && typeof filterEnd != "string" && !filterEnd.toDateString)
    return {};

  if (filterStart && filterEnd)
    return {
      $and: [
        {
          [prefix + "Start"]: {
            $lte: filterEnd,
          },
        },
        {
          [prefix + "End"]: {
            $gte: filterStart,
          },
        },
      ],
    };

  if (filterStart)
    return {
      [prefix + "End"]: {
        $gte: filterStart,
      },
    };

  if (filterEnd)
    return {
      [prefix + "Start"]: {
        $lte: filterEnd,
      },
    };

  return {};
};

const generateTextFilters = (text: string) => {
  return {
    $or: [
      {
        name: {
          $containsi: text,
        },
      },
    ],
  };
};

const generateTagFilters = (tagNames: string[]) => {
  return tagNames && tagNames.length
    ? {
        tags: {
          name: {
            $in: tagNames,
          },
        },
      }
    : undefined;
};

const generateStatusFilters = (status?: string) => {
  if (!status) return {};

  switch (status) {
    case "Завершённые":
      return {
        dateEnd: {
          $lte: new Date(),
        },
      };
    case "Активные":
      return {
        dateStart: {
          $lte: new Date(),
        },
        dateEnd: {
          $gte: new Date(),
        },
      };
    case "С вакансиями":
      return {
        team: {
          id: {
            $null: true,
          },
        },
      };
    default:
      return {};
  }
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
    $and: [
      (filters.dateStart || filters.dateEnd) && dateFilters,
      (filters.enrollmentStart || filters.enrollmentEnd) && enrollmentFilters,
      filters.text && generateTextFilters(filters.text),
      filters.tags && generateTagFilters(filters.tags),
      filters.status && generateStatusFilters(filters.status),
    ].filter((elem) => elem),
  };
};
