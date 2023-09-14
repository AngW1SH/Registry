import { FC, ReactNode } from "react";

interface ButtonAltProps {
  children: ReactNode;
  className?: string;
}

const ButtonAlt: FC<ButtonAltProps> = ({ children, className = "" }) => {
  return (
    <button
      className={
        "cursor-pointer rounded-3xl bg-white p-3 font-bold text-black " +
        className
      }
    >
      {children}
    </button>
  );
};

export default ButtonAlt;
