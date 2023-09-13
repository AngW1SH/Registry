import Image from "next/image";
import { FC } from "react";

interface UserNavProps {}

const UserNav: FC<UserNavProps> = () => {
  return (
    <div>
      <Image src="/user-nav.svg" height="32" width="32" alt="" />
    </div>
  );
};

export default UserNav;
