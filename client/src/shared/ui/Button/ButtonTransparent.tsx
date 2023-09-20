import { FC, ReactNode } from "react";

interface ButtonTransparentProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => any;
}

const ButtonTransparent: FC<ButtonTransparentProps> = ({
  children,
  className = "",
  type = "button",
  onClick,
}) => {
  return (
    <button
      className={
        "cursor-pointer rounded-3xl border-2 border-white px-3 py-2 font-bold text-white " +
        className
      }
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonTransparent;
