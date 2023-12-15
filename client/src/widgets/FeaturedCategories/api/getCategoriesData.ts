import { staticValues } from "../config/staticValues";
import { CategoryCard } from "../types/types";

export const getCategoriesData = async (): Promise<CategoryCard[] | null> => {
  const result: CategoryCard[] = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "api/category/featured",
  ).then((response) => {
    try {
      return response.ok ? response.json() : null;
    } catch {
      return null;
    }
  });
  return result;
};
