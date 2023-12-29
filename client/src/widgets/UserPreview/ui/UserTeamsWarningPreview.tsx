import { NamedBlock } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface UserTeamsWarningPreviewProps {
  className?: string;
}

const UserTeamsWarningPreview: FC<UserTeamsWarningPreviewProps> = ({
  className,
}) => {
  return (
    <NamedBlock className={className} title="Команды" link="/user/teams">
      <div className="flex items-center">
        <div className="relative min-h-[2.5rem] min-w-[2.5rem]">
          <Image fill={true} src="/warning-circle-icon-alt.svg" alt="" />
        </div>
        <div className="pr-5" />
        <p className="font-[0.9375rem] text-[#898989]">
          Для распределения в команду заполните анкету
        </p>
      </div>
    </NamedBlock>
  );
};

export default UserTeamsWarningPreview;
