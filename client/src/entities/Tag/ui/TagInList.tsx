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
        "w-max border-[#9a9a9a] px-5 py-2 text-sm text-[#7a7a7a] " + className
      }
    >
      {children}
    </ButtonTransparentAlt>
  );
};

export default TagInList;
