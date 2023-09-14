import { FC, ReactNode } from "react";

interface HeadlineProps {
  children: ReactNode;
}

const Headline: FC<HeadlineProps> = ({ children }) => {
  return (
    <div className="border-b-2 border-black ">
      {children}
      <div className="pt-4" />
    </div>
  );
};

export default Headline;
