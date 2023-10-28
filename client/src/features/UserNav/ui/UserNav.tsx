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
    <div className="group relative z-40 cursor-pointer">
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
        <div className="flex items-center">
          <p className="text-[0.9375rem] text-[#898989]">
            {data.name.split(" ")[1]}
          </p>
          <div className="pr-3" />
          <Image
            src={text == "bright" ? "/user-nav.svg" : "/user-nav-dark.svg"}
            height="32"
            width="32"
            alt=""
          />
        </div>
      )}
      {data && (
        <div className="invisible absolute -right-1/2 top-full pt-4 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
          <ul className="relative flex flex-col gap-5 whitespace-nowrap rounded-lg bg-white py-8 font-medium text-black shadow-center-lg">
            <li className="cursor-pointer px-7">
              <Link href="/user">Мой профиль</Link>
            </li>
            <li className="cursor-pointer px-7">
              <Link href="/user/teams">Команды</Link>
            </li>
            <li className="cursor-pointer px-7">
              <Link href="/user/projects">Проекты</Link>
            </li>
            <li className="cursor-pointer px-7">
              <Link href="/user/forms">Анкеты</Link>
            </li>
            <li
              className="cursor-pointer px-7 text-primary"
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
