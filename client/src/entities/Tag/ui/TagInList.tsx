import { ButtonTransparentAlt } from "@/shared/ui";
import { FC, ReactNode } from "react";

interface TagInListProps {
  children: ReactNode;
  className?: string;
}

const TagInList: FC<TagInListProps> = ({ children, className = "" }) => {
  return (
    <ButtonTransparentAlt
      className={
        "w-max border border-[#9a9a9a] px-5 py-2 text-sm font-normal text-[#303030] " +
        className
      }
    >
      {children}
    </ButtonTransparentAlt>
  );
};

export default TagInList;
