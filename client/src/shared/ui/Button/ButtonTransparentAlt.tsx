import { FC, ReactNode } from "react";

interface ButtonTransparentAltProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => any;
}

const ButtonTransparentAlt: FC<ButtonTransparentAltProps> = ({
  children,
  className = "",
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={"cursor-pointer rounded-3xl border-2 font-bold " + className}
      type={type}
    >
      {children}
    </button>
  );
};

export default ButtonTransparentAlt;
