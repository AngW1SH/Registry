import {
  CallIcon,
  DocumentIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from "@/shared/ui/Icons";
import { FC } from "react";
import MenuItem from "./MenuItem";
import { Logout } from "@/features/Logout";

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  return (
    <ul className="flex h-full flex-col text-[#AEAEAE] text-lg">
      <MenuItem icon={<ProfileIcon />}>Profile</MenuItem>
      <MenuItem icon={<DocumentIcon />}>Projects</MenuItem>
      <MenuItem icon={<DocumentIcon />}>Collections</MenuItem>

      <div className="h-px my-4 w-full bg-[#ececee]"></div>

      <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
      <MenuItem icon={<CallIcon />}>Help</MenuItem>

      <li
        className={
          "group rounded-lg px-6 py-3 cursor-pointer transition-[background-color] hover:bg-secondary mt-auto"
        }
      >
        <Logout icon={<LogoutIcon />}>Log Out</Logout>
      </li>
    </ul>
  );
};

export default Menu;
