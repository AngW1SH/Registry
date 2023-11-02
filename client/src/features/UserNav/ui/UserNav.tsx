"use client";
import Image from "next/image";
import { FC, useContext } from "react";
import { logout } from "../api/logout";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useAuthQuery } from "@/entities/User";

interface UserNavProps {
  text?: "bright" | "dark";
}

const UserNav: FC<UserNavProps> = ({ text = "bright" }) => {
  const router = useRouter();

  const { data } = useAuthQuery();

  const queryClient = useQueryClient();

  const handleLogin = async () => {
    if (!data) {
      router.push("/api/user/try");
    }
  };

  const handleLogout = async () => {
    const isOk = await logout();

    if (isOk) {
      if (queryClient)
        queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.refresh();
    }
  };

  return (
    <div className="group relative z-[60] cursor-pointer">
      {!data && (
        <div onClick={handleLogin}>
          <Image
            src={text == "bright" ? "/user-nav.svg" : "/user-nav-dark.svg"}
            height="32"
            width="32"
            alt=""
          />
        </div>
      )}
      {data && (
        <div className="flex flex-col-reverse items-center sm:flex-row">
          <p className="pt-3 text-xl text-[#898989] sm:pt-0 sm:text-[0.9375rem] ">
            {data.name.split(" ")[1]}
          </p>
          <div className="pr-3" />
          <div
            className={`relative h-8 w-8 ${
              text == "bright" ? "sm:block" : ""
            } hidden`}
          >
            <Image src="/user-nav.svg" fill={true} alt="" />
          </div>
          <div
            className={`relative h-14 w-14 sm:h-8 sm:w-8 ${
              text == "bright" ? "sm:hidden" : ""
            }`}
          >
            <Image src="/user-nav-dark.svg" fill={true} alt="" />
          </div>
        </div>
      )}
      {data && (
        <div className="right-0 top-full pr-12 pt-4 transition-opacity sm:invisible sm:absolute sm:pr-0 sm:opacity-0 sm:group-hover:visible sm:group-hover:opacity-100">
          <ul className="relative flex flex-col gap-7 whitespace-nowrap rounded-lg pt-8 text-xl text-black sm:gap-5 sm:bg-white sm:pb-8 sm:text-base sm:font-medium sm:shadow-center-lg">
            <li className="cursor-pointer sm:px-7">
              <Link href="/user">Мой профиль</Link>
            </li>
            <li className="cursor-pointer sm:px-7">
              <Link href="/user/teams">Команды</Link>
            </li>
            <li className="cursor-pointer sm:px-7">
              <Link href="/user/projects">Проекты</Link>
            </li>
            <li className="cursor-pointer sm:px-7">
              <Link href="/user/forms">Анкеты</Link>
            </li>
            <li
              className="cursor-pointer text-primary sm:px-7"
              onClick={handleLogout}
            >
              Выйти
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserNav;
