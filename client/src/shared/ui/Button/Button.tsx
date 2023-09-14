import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className = "" }) => {
  return (
    <div
      className={"bg-primary rounded-3xl p-3 font-bold text-white " + className}
    >
      {children}
    </div>
  );
};

export default Button;
