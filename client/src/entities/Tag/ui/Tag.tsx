import { ButtonTransparentAlt } from "@/shared/ui";
import { FC, ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
  selected?: boolean;
}

const Tag: FC<TagProps> = ({ children, className = "", selected = false }) => {
  if (selected)
    return (
      <ButtonTransparentAlt
        className={"w-max bg-black px-5 py-2 text-white " + className}
      >
        {children}
      </ButtonTransparentAlt>
    );

  return (
    <ButtonTransparentAlt className={"w-max px-5 py-2 " + className}>
      {children}
    </ButtonTransparentAlt>
  );
};

export default Tag;
