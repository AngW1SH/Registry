import { FC, ReactNode } from "react";

interface ButtonAltProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => any;
}

const ButtonAlt: FC<ButtonAltProps> = ({
  children,
  className = "",
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={
        "cursor-pointer rounded-3xl bg-white p-3 font-bold text-black " +
        className
      }
      type={type}
    >
      {children}
    </button>
  );
};

export default ButtonAlt;
