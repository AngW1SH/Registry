"use client";
import { useAuthUserQuery } from "@/composites/AuthUser";
import { useProfileQuery } from "@/composites/Profile";
import { Block, NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface UserProfilePreviewProps {
  className?: string;
}

const UserProfilePreview: FC<UserProfilePreviewProps> = ({
  className = "",
}) => {
  const { data: user } = useAuthUserQuery();

  if (!user) return <div></div>;

  return (
    <NamedBlock title={"Личные данные"} className={className}>
      <ul className="flex flex-col gap-6">
        <li className="flex">
          <p className="w-1/4 font-[0.9375rem] text-[#a1a1a1]">E-mail</p>
          <p>{user.user.email}</p>
        </li>
        <li className="flex">
          <p className="w-1/4 font-[0.9375rem] text-[#a1a1a1]">Группа</p>
          <p>20.Б07-пу</p>
        </li>
        <li className="flex">
          <p className="w-1/4 font-[0.9375rem] text-[#a1a1a1]">Возраст</p>
          <p>21</p>
        </li>
      </ul>
    </NamedBlock>
  );
};

export default UserProfilePreview;
