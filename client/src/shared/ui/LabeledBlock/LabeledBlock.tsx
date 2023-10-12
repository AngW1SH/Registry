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
    <div className="flex">
      <div className="w-1/5 xl:w-1/4">
        <h2 className={"w-min text-xl uppercase xl:text-2xl " + labelClassName}>
          {label}
        </h2>
      </div>
      <div className="w-4/5 xl:w-3/4">{children}</div>
    </div>
  );
};

export default LabeledBlock;
