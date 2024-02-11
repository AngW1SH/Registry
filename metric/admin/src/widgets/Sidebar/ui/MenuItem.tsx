import { TextWithIcon } from "@/shared/ui/TextWithIcon";
import { FC, HTMLAttributes, ReactElement } from "react";

interface MenuItemProps {
  icon: ReactElement<HTMLAttributes<SVGSVGElement>>;
  className?: string;
  children: string;
}

const MenuItem: FC<MenuItemProps> = ({ icon, className = "", children }) => {
  return (
    <li
      className={
        "group rounded-lg px-6 py-3 cursor-pointer transition-[background-color] hover:bg-secondary " +
        className
      }
    >
      <TextWithIcon
        className="group-hover:text-primary transition-[color]"
        icon={icon}
      >
        {children}
      </TextWithIcon>
    </li>
  );
};

export default MenuItem;
