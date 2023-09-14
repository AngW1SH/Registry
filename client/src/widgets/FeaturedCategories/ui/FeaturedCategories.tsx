import { FC } from "react";
import SuggestProject from "./SuggestProject";
import { staticValues } from "../config/staticValues";
import CategoryCardDetailed from "./CategoryCardDetailed";
import CategoryCardWithImage from "./CategoryCardWithImage";

interface FeaturedCategoriesProps {}

const FeaturedCategories: FC<FeaturedCategoriesProps> = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-1">
      {staticValues.map((category) =>
        category.type == "detailed" ? (
          <CategoryCardDetailed
            key={category.name}
            className="col-span-1 row-span-1 overflow-hidden rounded-lg"
            category={category}
          />
        ) : (
          <CategoryCardWithImage
            key={category.name}
            className="col-span-1 row-span-1 overflow-hidden rounded-lg"
            category={category}
          />
        ),
      )}
      <SuggestProject className="col-span-1 col-start-4 row-span-2 row-start-2 overflow-hidden rounded-lg" />
    </div>
  );
};

export default FeaturedCategories;
