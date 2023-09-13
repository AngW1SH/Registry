import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={
        "mx-auto sm:w-full md:w-[640px] lg:w-[850px] xl:w-[1150px] " + className
      }
    >
      {children}
    </div>
  );
};

export default Container;
