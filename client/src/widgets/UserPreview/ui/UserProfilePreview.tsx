"use client";
import { useProfileQuery } from "@/composites/Profile";
import { useAuthQuery } from "@/entities/User";
import { Block, ButtonAlt, NamedBlock } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface UserProfilePreviewProps {
  className?: string;
}

const UserProfilePreview: FC<UserProfilePreviewProps> = ({
  className = "",
}) => {
  const { data: profile } = useProfileQuery();

  if (!profile) return <div></div>;

  const name = [
    profile.user.fullName.surname,
    profile.user.fullName.name,
    profile.user.fullName.patronymic,
  ]
    .join(" ")
    .trim();

  if (!profile.user.email)
    return (
      <NamedBlock
        accent={true}
        title={"Личные данные"}
        className={className}
        link="/user/profile"
      >
        <div className="flex h-full flex-col items-start">
          <div className="flex items-center">
            <div className="relative h-10 w-10">
              <Image fill={true} src="/warning-circle-icon-white.svg" alt="" />
            </div>
            <div className="pr-5" />
            <p className="font-medium">У вас не указана корпоративная почта</p>
          </div>
          <div className="pt-11" />
          <Link href="/user/profile">
            <ButtonAlt className="mt-auto rounded-full px-8 py-3">
              Заполнить личные данные
            </ButtonAlt>
          </Link>
        </div>
      </NamedBlock>
    );

  return (
    <NamedBlock
      title={"Личные данные"}
      className={className}
      link="/user/profile"
    >
      <ul className="flex flex-col gap-6">
        <li className="flex">
          <p className="w-1/4 font-[0.9375rem] text-[#a1a1a1]">Имя</p>
          <p>
            {[
              profile.user.fullName.surname,
              profile.user.fullName.name,
              profile.user.fullName.patronymic,
            ].join(" ")}
          </p>
        </li>
        <li className="flex">
          <p className="w-1/4 font-[0.9375rem] text-[#a1a1a1]">E-mail</p>
          <p>{profile.user.email}</p>
        </li>
        <li className="flex">
          <p className="w-1/4 font-[0.9375rem] text-[#a1a1a1]">Телефон</p>
          <p>{profile.user.phone}</p>
        </li>
      </ul>
    </NamedBlock>
  );
};

export default UserProfilePreview;
