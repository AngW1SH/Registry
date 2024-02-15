import { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent) => any;
  style?: React.CSSProperties;
}

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  style = {},
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={style}
      className={
        "cursor-pointer rounded-3xl bg-primary p-3 font-bold text-white " +
        className
      }
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
