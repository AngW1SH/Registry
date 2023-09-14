import { FC, ReactNode } from "react";

interface ButtonTransparentProps {
  children: ReactNode;
  className?: string;
}

const ButtonTransparent: FC<ButtonTransparentProps> = ({
  children,
  className = "",
}) => {
  return (
    <button
      className={
        "cursor-pointer rounded-3xl border-2 border-white px-3 py-2 font-bold text-white " +
        className
      }
    >
      {children}
    </button>
  );
};

export default ButtonTransparent;
