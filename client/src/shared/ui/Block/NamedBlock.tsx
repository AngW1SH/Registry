import { FC, ReactNode } from "react";

interface NamedBlockProps {
  title: string;
  children: ReactNode;
  className?: string;
  accent?: boolean;
  border?: boolean;
}

const NamedBlock: FC<NamedBlockProps> = ({
  title,
  children,
  className = "",
  accent = false,
  border = true,
}) => {
  return (
    <div
      className={
        `flex flex-col rounded-xl p-11 shadow-center-lg ${
          accent ? "bg-primary text-white" : ""
        } ` + className
      }
    >
      <h2
        className={`${border ? "border-b pb-4" : "pb-2"} ${
          accent ? "border-white" : "border-[#a1a1a1]"
        } text-[1.375rem] font-semibold`}
      >
        {title}
      </h2>
      <div className="pb-5" />
      {children}
    </div>
  );
};

export default NamedBlock;
