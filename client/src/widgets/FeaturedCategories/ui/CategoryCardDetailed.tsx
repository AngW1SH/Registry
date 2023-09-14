import { FC } from "react";
import { CategoryCardDetailed } from "../types/types";
import Link from "next/link";
import { Block } from "@/shared/ui";

interface CategoryCardDetailedProps {
  category: CategoryCardDetailed;
  className?: string;
}

const CategoryCardDetailed: FC<CategoryCardDetailedProps> = ({
  category,
  className = "",
}) => {
  return (
    <Block className={"px-8 pb-5 pt-10 " + className}>
      <h2 className="w-1/2 text-lg font-bold uppercase leading-6">
        <Link href={category.link}>{category.name}</Link>
      </h2>
      <div className="pt-5" />
      <ul>
        {category.tags.map((tag) => (
          <li key={tag.id} className="pb-1 text-[13px]">
            <Link href={"/tag/" + tag.id}>{tag.name} </Link>
            <span className="pl-2 text-[#808285]">{tag.projectsCount}</span>
          </li>
        ))}
      </ul>
      {category.showMore && (
        <span className="text-[13px] text-primary">
          <Link href={category.link}>Ещё...</Link>
        </span>
      )}
    </Block>
  );
};

export default CategoryCardDetailed;
