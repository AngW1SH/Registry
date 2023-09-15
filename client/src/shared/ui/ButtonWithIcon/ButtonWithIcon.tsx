import Image from "next/image";
import { FC, ReactNode } from "react";

interface ButtonWithIconProps {
  icon: string;
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
}

const ButtonWithIcon: FC<ButtonWithIconProps> = ({
  icon,
  children,
  className = "",
}) => {
  return (
    <button
      className={
        "flex items-center justify-center rounded-2xl bg-secondary-rgba " +
        className
      }
    >
      <div className="relative flex h-8  w-8 items-center justify-center">
        <Image src={icon} alt="" fill={true} />
      </div>
      <span className="font-semibold">{children}</span>
    </button>
  );
};

export default ButtonWithIcon;
