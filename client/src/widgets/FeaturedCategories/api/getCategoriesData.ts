import { staticValues } from "../config/staticValues";
import { CategoryCard } from "../types/types";

export const getCategoriesData = async () => {
  const result: CategoryCard[] = await fetch(
    process.env.NEXT_PUBLIC_WEBSITE_URL + "api/category/featured",
  ).then((response) => {
    if (!response.ok) return [];

    return response.json();
  });
  return result;
};
