import { TagListStrapi } from "../../tag";

export interface DetailedCategoryStrapi {
  id: number;
  name: string;
  tags: TagListStrapi | { data: null };
  __component?: "detailed-category.detailed-category";
}
