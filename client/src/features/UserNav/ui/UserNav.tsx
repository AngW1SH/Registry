import Image from "next/image";
import { FC } from "react";

interface UserNavProps {
  text?: "bright" | "dark";
}

const UserNav: FC<UserNavProps> = ({ text = "bright" }) => {
  return (
    <div>
      <Image
        src={text == "bright" ? "/user-nav.svg" : "/user-nav-dark.svg"}
        height="32"
        width="32"
        alt=""
      />
    </div>
  );
};

export default UserNav;
