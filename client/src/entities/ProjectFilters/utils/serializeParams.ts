import { Filters } from "../types/types";

export const serializeFilterParams = (filters: Filters) => {
  const current = new URLSearchParams();

  Array.from(current.keys()).forEach((key) => {
    if (key.indexOf("tag") != -1) {
      current.delete(key);
    }
  });

  Object.keys(filters).forEach((key) => {
    if (key != "status" && key != "tags") {
      if (filters[key as keyof Filters]) {
        current.set(key, "" + filters[key as keyof Filters]);
      } else {
        current.delete(key);
      }

      return;
    }

    if (key == "tags" && filters.tags) {
      filters.tags.forEach((tag, index) => {
        if (filters[key as keyof Filters]) {
          current.set("tag" + index, "" + tag);
        } else {
          current.delete("tag" + index);
        }
      });

      return;
    }

    if (key == "status" && filters.status && filters.status != "Все") {
      if (filters[key as keyof Filters]) {
        current.set(key, "" + filters[key as keyof Filters]);
      } else {
        current.delete(key);
      }
    }
  });

  const search = current.toString();
  return search ? `?${search}` : "";
};
