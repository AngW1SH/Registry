import { FC } from "react";
import { staticTags } from "../static/staticTags";
import TagInList from "./TagInList";

interface TagListProps {
  className?: string;
}

const TagList: FC<TagListProps> = ({ className }) => {
  return (
    <ul className={"flex flex-wrap gap-1 " + className}>
      {staticTags.slice(0, 2).map((tag) => (
        <li key={tag.id}>
          <TagInList>{tag.name}</TagInList>
        </li>
      ))}
    </ul>
  );
};

export default TagList;
