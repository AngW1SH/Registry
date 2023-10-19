"use client";
import { useAuthUserQuery } from "@/composites/AuthUser";
import Image from "next/image";
import { FC, useContext } from "react";
import { logout } from "../api/logout";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface UserNavProps {
  text?: "bright" | "dark";
}

const UserNav: FC<UserNavProps> = ({ text = "bright" }) => {
  const router = useRouter();

  const { data } = useAuthUserQuery();

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
      <div onClick={handleLogin}>
        <Image
          src={text == "bright" ? "/user-nav.svg" : "/user-nav-dark.svg"}
          height="32"
          width="32"
          alt=""
        />
      </div>
      {data && (
        <div className="invisible absolute -right-1/2 top-full pt-4 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
          <ul className="relative rounded-lg bg-white py-1 text-black shadow-center-lg after:absolute after:bottom-[100%] after:right-[26%] after:-mb-[5px] after:h-[10px] after:w-[10px] after:translate-x-1/2 after:rotate-45 after:bg-white after:shadow-center-lg">
            <li className="cursor-pointer px-8 py-1" onClick={handleLogout}>
              Выйти
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserNav;
