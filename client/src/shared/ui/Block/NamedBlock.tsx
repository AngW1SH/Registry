import { FC, ReactNode } from "react";

interface NamedBlockProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const NamedBlock: FC<NamedBlockProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div
      className={"flex flex-col rounded-xl p-11 shadow-center-lg " + className}
    >
      <h2 className="border-b border-[#a1a1a1] pb-4 text-[1.375rem] font-semibold">
        {title}
      </h2>
      <div className="pb-5" />
      {children}
    </div>
  );
};

export default NamedBlock;
