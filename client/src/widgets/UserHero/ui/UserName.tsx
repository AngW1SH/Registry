"use client";
import { useAuthQuery } from "@/entities/User";
import { LoadingCircle } from "@/shared/ui";
import { FC } from "react";

interface UserNameProps {}

const UserName: FC<UserNameProps> = () => {
  const { data: authUser, isLoading } = useAuthQuery();

  if (isLoading || !authUser) {
    return (
      <div className="flex h-20 items-center pl-7">
        <LoadingCircle />
      </div>
    );
  }

  const name = authUser.name.split(" ")[1];

  return (
    <div className="flex items-center">
      <div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-[2.0625rem] text-[#c4c6c8]">
          {name[0].toUpperCase()}
        </div>
      </div>
      <div className="pr-6" />
      <h2 className="text-[2.4375rem] font-semibold">{name}</h2>
    </div>
  );
};

export default UserName;
