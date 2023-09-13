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
        "bg-secondary-rgba flex items-center justify-center gap-5 rounded-2xl p-5 " +
        className
      }
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <Image src={icon} alt="" fill={true} />
      </div>
      <span className="text-lg font-semibold">{children}</span>
    </button>
  );
};

export default ButtonWithIcon;
