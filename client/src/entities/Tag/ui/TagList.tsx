import { FC } from "react";
import { staticTags } from "../static/staticTags";
import TagInList from "./TagInList";
import { ITag } from "../types/types";
import Link from "next/link";

interface TagListProps {
  tags: ITag[] | string[];
  className?: string;
}

const TagList: FC<TagListProps> = ({ tags, className }) => {
  return (
    <ul className={"flex flex-wrap gap-1 " + className}>
      {tags.map((tag) => {
        if (typeof tag == "string")
          return (
            <li key={tag}>
              <TagInList>{tag}</TagInList>
            </li>
          );

        return (
          <li key={tag.id}>
            <Link href={"/projects/?tag0=" + tag.name}>
              <TagInList>{tag.name}</TagInList>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TagList;
