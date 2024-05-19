import { FC, ReactNode } from "react";
import { TooltipIcon } from "../../Icons";

interface TooltipProps {
  children: ReactNode;
  tooltip: ReactNode;
  className?: string;
  size?: number;
  gap?: number;
}

const Tooltip: FC<TooltipProps> = ({
  children,
  tooltip,
  size = 20,
  gap = 5,
  className = "",
}) => {
  return (
    <div
      className={"inline-block relative " + className}
      style={{
        paddingRight: size + gap + "px",
      }}
    >
      <div>{children}</div>
      <div
        className="absolute z-10 group top-1/2 -translate-y-1/2 right-0"
        style={{
          height: size + "px",
          width: size + "px",
        }}
      >
        <div>
          <TooltipIcon />
        </div>
        <div className="text-sm z-10 text-black absolute w-max max-w-[400px] top-full left-1/2 hidden mt-3 group-hover:flex shadow-xl bg-white py-4 px-7 rounded-lg -translate-x-1/2">
          {tooltip}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
