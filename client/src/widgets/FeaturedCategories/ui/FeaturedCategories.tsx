import { FC } from "react";
import SuggestProject from "./SuggestProject";
import { staticValues } from "../config/staticValues";
import CategoryCardDetailed from "./CategoryCardDetailed";
import CategoryCardWithImage from "./CategoryCardWithImage";

interface FeaturedCategoriesProps {}

const FeaturedCategories: FC<FeaturedCategoriesProps> = () => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4 xl:grid-cols-4 xl:grid-rows-3">
      {staticValues.map((category) =>
        category.type == "detailed" ? (
          <CategoryCardDetailed
            key={category.name}
            className="overflow-hidden rounded-lg"
            category={category}
          />
        ) : (
          <CategoryCardWithImage
            key={category.name}
            className="overflow-hidden rounded-lg"
            category={category}
          />
        ),
      )}
      <SuggestProject className="col-span-1 row-span-2 overflow-hidden rounded-lg sm:col-start-2 sm:row-start-2 lg:col-start-3 xl:col-start-4" />
    </div>
  );
};

export default FeaturedCategories;
