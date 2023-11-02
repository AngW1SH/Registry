"use client";
import { UserNav } from "@/features/UserNav";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";

interface HeaderProps {
  text?: "bright" | "dark";
}

const Header: FC<HeaderProps> = ({ text = "bright" }) => {
  const [opened, setOpened] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current) {
        if (
          e.target instanceof HTMLElement &&
          !ref.current.contains(e.target)
        ) {
          setOpened(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref.current]);

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between">
        <div>
          <Link href="/">
            <Image
              src={text == "bright" ? "/logo.svg" : "/logo-dark.svg"}
              alt=""
              height="50"
              width="140"
              priority
            />
          </Link>
        </div>
        <div
          className={`shadow-center-xl fixed right-0 top-0 z-50 h-screen flex-col overflow-auto bg-[#F5F6FA] py-9 pl-6 pr-5 transition-transform sm:overflow-visible sm:text-black ${
            text == "bright" ? "sm:text-white" : "sm:text-black"
          } ${
            opened ? "" : "translate-x-full"
          } flex sm:static sm:h-auto sm:translate-x-0 sm:flex-row sm:bg-transparent sm:pr-0 sm:shadow-none`}
        >
          <ul className="mr-10 hidden flex-col gap-7 text-xl sm:flex sm:flex-row sm:items-center sm:gap-0 sm:text-base">
            <li className="mr-4">
              <Link href="/projects">Список проектов</Link>
            </li>
            <li>Заказчикам</li>
          </ul>
          <div
            className="relative ml-auto min-h-[32px] min-w-[32px] cursor-pointer sm:hidden"
            onClick={() => setOpened(false)}
          >
            <Image src="/x-gray.svg" alt="Закрыть меню" fill={true} />
          </div>
          <div className="pt-10 sm:hidden" />
          <UserNav text={text} />
        </div>
        <div className="relative h-10 w-10 cursor-pointer sm:hidden">
          <Image
            src="/bars-white-alt.svg"
            alt=""
            fill={true}
            onClick={() => setOpened(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
