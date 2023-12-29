import { NamedBlock } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface UserTeamsMultiplePreviewProps {
  className?: string;
}

const UserTeamsMultiplePreview: FC<UserTeamsMultiplePreviewProps> = ({
  className = "",
}) => {
  return (
    <NamedBlock className={className} title="Команды" link="/user/teams">
      <div className="flex items-end justify-between pr-10">
        <p className="text-[0.9375rem] text-[#898989]">
          Количество команд,
          <br />
          где Вы являетесь участником
        </p>
        <div className="pr-4" />
        <p className="flex items-center justify-center text-4xl font-medium">
          3
        </p>
      </div>
      <div className="pt-7" />
      <div className="relative flex items-end justify-between pr-10">
        <p className="text-[0.9375rem] text-[#898989]">
          Количество команд,
          <br />
          где Вы являетесь представителем
        </p>
        <div className="pr-4" />
        <p className="flex items-center justify-center text-4xl font-medium">
          1
        </p>
        <div className="absolute bottom-px right-0 min-h-[2.5rem] min-w-[2.5rem] translate-x-1/2">
          <Image fill={true} src="/teamlead-icon.svg" alt="" />
        </div>
      </div>
    </NamedBlock>
  );
};

export default UserTeamsMultiplePreview;
