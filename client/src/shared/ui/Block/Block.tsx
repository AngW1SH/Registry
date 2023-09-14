import { FC, ReactNode } from "react";

interface BlockProps {
  children: ReactNode;
  className?: string;
}

const Block: FC<BlockProps> = ({ children, className = "" }) => {
  return <div className={"shadow-center-lg " + className}>{children}</div>;
};

export default Block;
