import { FC, ReactNode } from "react";

interface ButtonTransparentAltProps {
  children: ReactNode;
  className?: string;
}

const ButtonTransparentAlt: FC<ButtonTransparentAltProps> = ({
  children,
  className = "",
}) => {
  return (
    <button
      className={
        "cursor-pointer rounded-3xl border-2 border-black px-3 py-2 font-bold text-black " +
        className
      }
    >
      {children}
    </button>
  );
};

export default ButtonTransparentAlt;
