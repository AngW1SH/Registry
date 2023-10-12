import { FC, ReactNode } from "react";

interface LabeledBlockProps {
  label: string;
  children: ReactNode | string | number;
  labelClassName?: string;
}

const LabeledBlock: FC<LabeledBlockProps> = ({
  label,
  children,
  labelClassName = "",
}) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/5 xl:w-1/4">
        <h2
          className={
            "text-center text-2xl uppercase lg:w-min lg:text-left lg:text-xl xl:text-2xl " +
            labelClassName
          }
        >
          {label}
        </h2>
      </div>
      <div className="pt-5 lg:hidden" />
      <div className="flex flex-col items-center lg:w-4/5 lg:items-start xl:w-3/4">
        {children}
      </div>
    </div>
  );
};

export default LabeledBlock;
