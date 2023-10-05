import { initialFilters } from "../config/initialFilters";
import { Filters } from "../types/types";

export const getFiltersByParams = (searchParams?: {
  [key: string]: string | string[] | undefined;
}) => {
  const filters: Filters = JSON.parse(JSON.stringify(initialFilters));

  if (!searchParams) return filters;

  Object.keys(searchParams).forEach((key) => {
    if (key.indexOf("tag") == -1) {
      const param = searchParams[key];

      if (param) {
        filters[key as keyof Filters] = param as any;
      }

      return;
    }

    if (key.indexOf("tag") != -1) {
      const param = searchParams[key];

      if (!param || typeof param != "string") return;

      if (!filters.tags) return (filters.tags = [param]);

      const index = parseInt(key.slice(3));
      filters.tags[index] = param;

      return;
    }
  });

  filters.tags = filters.tags ? filters.tags.filter((tag) => tag) : null;

  return filters;
};
