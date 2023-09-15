import { UserNav } from "@/features/UserNav";
import Image from "next/image";
import { FC } from "react";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Image
          src="https://spbu.ru/themes/spbgu/markup/dist/img/logo-big.svg"
          alt=""
          height="72"
          width="250"
          priority
        />
      </div>
      <div className="hidden text-white sm:flex">
        <ul className="mr-10 flex items-center">
          <li className="mr-4">Список проектов</li>
          <li>Заказчикам</li>
        </ul>
        <UserNav />
      </div>
      <div className="relative block h-10 w-10 cursor-pointer sm:hidden">
        <Image src="/bars-white-alt.svg" alt="" fill={true} />
      </div>
    </div>
  );
};

export default Header;
