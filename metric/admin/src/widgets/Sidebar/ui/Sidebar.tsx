import { FC } from "react";
import Menu from "./Menu";

interface SidebarProps {}

const Sidebar: FC<SidebarProps> = () => {
  return (
    <nav className="fixed top-5 bottom-5 left-5 bg-background rounded-2xl px-5 pt-16 pb-10 flex flex-col">
      <div className="px-6">
        <img className="mx-auto" src="/logo.svg" alt="Trackit" />
      </div>
      <div className="pt-8" />
      <Menu />
    </nav>
  );
};

export default Sidebar;
