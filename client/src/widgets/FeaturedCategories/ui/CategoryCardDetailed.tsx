"use client";
import { FC } from "react";
import { CategoryCardDetailed } from "../types/types";
import Link from "next/link";
import { Block } from "@/shared/ui";
import { redirect, useRouter } from "next/navigation";

interface CategoryCardDetailedProps {
  category: CategoryCardDetailed;
  className?: string;
}

const CategoryCardDetailed: FC<CategoryCardDetailedProps> = ({
  category,
  className = "",
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/projects?tag0=" + category.name);
  };

  const handleTagClick = (e: React.MouseEvent<HTMLUListElement>) => {
    Array.from(e.currentTarget.children).forEach((child, index) => {
      if (child == e.target || child.contains(e.target as HTMLElement)) {
        router.push("/projects?tag0=" + category.tags[index].name);
      }
    });
  };

  return (
    <Block className={"px-8 pb-5 pt-10 " + className}>
      <h2
        onClick={handleClick}
        className="w-1/2 cursor-pointer text-lg font-bold uppercase leading-6"
      >
        {category.name}
      </h2>
      <div className="pt-5" />
      <ul onClick={handleTagClick}>
        {category.tags.map((tag) => (
          <li key={tag.id} className="pb-1 text-[13px]">
            <span className="cursor-pointer" onClick={handleClick}>
              {tag.name}{" "}
            </span>
            <span className="pl-2 text-[#808285]">{tag.projectsCount}</span>
          </li>
        ))}
      </ul>
      {category.showMore && (
        <span className="text-[13px] text-primary">
          <p onClick={handleClick}>Ещё...</p>
        </span>
      )}
    </Block>
  );
};

export default CategoryCardDetailed;
