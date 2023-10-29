import { FC } from "react";
import { UserSidebarItem, UserSidebarItemSlug } from "../types/types";
import { sidebarItems } from "../static/sidebarItems";
import Link from "next/link";

interface UserSidebarProps {
  active?: UserSidebarItemSlug;
  className?: string;
}

const UserSidebar: FC<UserSidebarProps> = ({
  active = "hero",
  className = "",
}) => {
  return (
    <ul className={"flex flex-col gap-4 text-[0.9375rem] " + className}>
      {sidebarItems.map((item) => (
        <li
          key={item.slug}
          className={`${active == item.slug ? "font-bold" : ""}`}
        >
          <Link href={"/user/" + (item.slug == "hero" ? "" : item.slug)}>
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UserSidebar;
