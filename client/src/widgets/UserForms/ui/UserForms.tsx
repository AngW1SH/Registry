"use client";
import { useProfileQuery } from "@/composites/Profile";
import { FormCard, staticForms } from "@/entities/Form";
import { Block, ButtonAlt, NamedBlock } from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface UserFormsProps {}

const UserForms: FC<UserFormsProps> = () => {
  const { data: profile } = useProfileQuery();

  if (!profile) return <div></div>;

  if (!profile.user.email)
    return (
      <NamedBlock
        accent={true}
        title={"Не указана корпоративная почта"}
        link="/user/profile"
      >
        <div className="flex h-full flex-col items-start">
          <div className="flex items-center">
            <div className="relative h-10 w-10">
              <Image fill={true} src="/warning-circle-icon-white.svg" alt="" />
            </div>
            <div className="pr-5" />
            <p className="font-medium">
              Для заполнения анкет необходимо указать корпоративную почту в
              настройках профиля.
            </p>
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
    <div>
      <h2 className="text-3xl uppercase">Анкеты</h2>
      <div className="pt-5" />
      {profile.forms.length > 0 && (
        <ul className="flex flex-col gap-5">
          {profile.forms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </ul>
      )}
      {profile.forms.length == 0 && (
        <p className="text-[#898989]">Пока нет доступных анкет</p>
      )}
    </div>
  );
};

export default UserForms;
