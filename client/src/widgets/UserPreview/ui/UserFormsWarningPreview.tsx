import { Button, ButtonAlt, NamedBlock } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface UserFormsWarningPreviewProps {
  className?: string;
}

const UserFormsWarningPreview: FC<UserFormsWarningPreviewProps> = ({
  className,
}) => {
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
};

export default UserFormsWarningPreview;
