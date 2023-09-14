import { FC } from "react";
import { CategoryCardWithImage } from "../types/types";
import Image from "next/image";
import { ButtonTransparent } from "@/shared/ui";

interface CategoryCardWithImageProps {
  category: CategoryCardWithImage;
  className?: string;
}

const CategoryCardWithImage: FC<CategoryCardWithImageProps> = ({
  category,
  className = "",
}) => {
  return (
    <div className={"relative flex flex-col justify-end p-8 " + className}>
      <div className="absolute inset-0 after:absolute after:inset-0 after:bg-[#777777cc]">
        <Image
          src={category.image}
          alt=""
          className="object-cover  grayscale"
          fill={true}
        />
      </div>
      <div className="relative">
        <h2 className="text-xl font-bold uppercase text-white">
          {category.name}
        </h2>
        <div className="pt-4" />
        <ButtonTransparent className="w-max text-xs font-normal">
          {category.projectsCount} проектов
        </ButtonTransparent>
      </div>
    </div>
  );
};

export default CategoryCardWithImage;
