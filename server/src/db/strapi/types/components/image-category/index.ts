import { TagStrapi } from "../../tag";

export interface ImageCategoryStrapi {
  id: number;
  tag: TagStrapi | { data: null };
  image: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
        mime: string;
        size: number;
      };
    } | null;
  };
  __component?: "image-category.image-category";
}
