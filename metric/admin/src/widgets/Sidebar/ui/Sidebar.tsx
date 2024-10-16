import { FC } from "react";
import Menu from "./Menu";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <nav className="h-full bg-background rounded-2xl px-5 pt-16 pb-10 flex flex-col">
      <div className="px-6">
        <img
          className="mx-auto"
          src={import.meta.env.VITE_BASE_PATH + "logo.svg"}
          alt="Trackit"
        />
      </div>
      <div className="pt-8" />
      <Menu />
    </nav>
  );
};

export default Sidebar;
