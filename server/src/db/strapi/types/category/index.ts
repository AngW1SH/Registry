import { DetailedCategoryStrapi } from "../components/detailed-category";
import { ImageCategoryStrapi } from "../components/image-category";

interface CategoryStrapiInner {
  id: number;
  attributes: {
    Featured: (DetailedCategoryStrapi | ImageCategoryStrapi)[];
  };
}

export interface CategoryStrapi {
  data: CategoryStrapiInner | null;
}

export interface CategoryListStrapi {
  data: CategoryStrapiInner[];
}
