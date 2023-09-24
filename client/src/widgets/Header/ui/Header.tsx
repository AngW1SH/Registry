import { UserNav } from "@/features/UserNav";
import Image from "next/image";
import { FC } from "react";

interface HeaderProps {
  text?: "bright" | "dark";
}

const Header: FC<HeaderProps> = ({ text = "bright" }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Image
          src={text == "bright" ? "/logo.svg" : "/logo-dark.svg"}
          alt=""
          height="50"
          width="140"
          priority
        />
      </div>
      <div
        className={`hidden ${
          text == "bright" ? "text-white" : "text-black"
        } sm:flex`}
      >
        <ul className="mr-10 flex items-center">
          <li className="mr-4">Список проектов</li>
          <li>Заказчикам</li>
        </ul>
        <UserNav text={text} />
      </div>
      <div className="relative block h-10 w-10 cursor-pointer sm:hidden">
        <Image src="/bars-white-alt.svg" alt="" fill={true} />
      </div>
    </div>
  );
};

export default Header;
