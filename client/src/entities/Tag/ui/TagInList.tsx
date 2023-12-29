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
        "w-max border border-[#303030] bg-white px-3 py-1 text-sm font-normal text-[#303030] " +
        className
      }
    >
      {children}
    </ButtonTransparentAlt>
  );
};

export default TagInList;
