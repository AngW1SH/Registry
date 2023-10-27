"use client";
import { useProfileQuery } from "@/composites/Profile";
import { Button, ButtonAlt, NamedBlock } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface UserFormsPreviewProps {
  className?: string;
}

const UserFormsPreview: FC<UserFormsPreviewProps> = ({ className }) => {
  const { data: profile } = useProfileQuery();

  if (!profile) return <div></div>;

  const completedForms = profile.forms.filter((form) => form.completed);

  if (!completedForms.length)
    return (
      <NamedBlock accent={true} className={className} title={"Анкеты"}>
        <div className="flex h-full flex-col items-start">
          <div className="flex items-center">
            <div className="relative h-10 w-10">
              <Image fill={true} src="/warning-circle-icon-white.svg" alt="" />
            </div>
            <div className="pr-5" />
            <p className="font-medium">У вас нет заполненных анкет</p>
          </div>
          <div className="pt-11" />
          <ButtonAlt className="mt-auto rounded-full px-8 py-3">
            Заполнить анкету
          </ButtonAlt>
        </div>
      </NamedBlock>
    );

  return (
    <NamedBlock className={className} title={"Анкеты"}>
      <div className="flex h-full flex-col items-start">
        <div className="flex items-end">
          <p className="font-[0.9375rem] text-[#898989]">Вы заполнили анкет </p>
          <div className="pr-16" />
          <p className="flex items-center justify-center text-4xl font-medium">
            {completedForms.length}
          </p>
        </div>
        <div className="pt-11" />
        <Button className="mt-auto rounded-full px-8 py-3">
          Заполнить анкету
        </Button>
      </div>
    </NamedBlock>
  );
};

export default UserFormsPreview;
