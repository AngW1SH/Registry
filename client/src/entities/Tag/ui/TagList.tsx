import { FC } from "react";
import { staticTags } from "../static/staticTags";
import TagInList from "./TagInList";
import { ITag } from "../types/types";

interface TagListProps {
  tags: ITag[];
  className?: string;
}

const TagList: FC<TagListProps> = ({ tags, className }) => {
  return (
    <ul className={"flex flex-wrap gap-1 " + className}>
      {tags.map((tag) => (
        <li key={tag.id}>
          <TagInList>{tag.name}</TagInList>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
