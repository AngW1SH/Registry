import { CategoryStrapi } from "../../types/category";
import { getDetailedCategoryFromStrapiDTO } from "../components/detailed-category";
import { DetailedCategoryStrapi } from "../../types/components/detailed-category";
import { getImageCategoryFromStrapiDTO } from "../components/image-category";
import { ImageCategoryStrapi } from "../../types/components/image-category";
import { Category } from "@/entities/category";

export const getCategoryFromStrapiDTO = (
  category: CategoryStrapi
): Category[] => {
  if (
    !category.data ||
    !category.data.attributes.Featured ||
    !category.data.attributes.Featured.length
  )
    return [];

  return category.data.attributes.Featured.map((category) => {
    if (category.hasOwnProperty("name"))
      return getDetailedCategoryFromStrapiDTO(
        category as DetailedCategoryStrapi
      );

    return getImageCategoryFromStrapiDTO(category as ImageCategoryStrapi);
  }).filter((category) => category) as Category[];
};
