import {
  CallIcon,
  DocumentIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from "@/shared/Icons";
import { FC } from "react";
import MenuItem from "./MenuItem";

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

      <MenuItem className="mt-auto" icon={<LogoutIcon />}>
        Log Out
      </MenuItem>
    </ul>
  );
};

export default Menu;
