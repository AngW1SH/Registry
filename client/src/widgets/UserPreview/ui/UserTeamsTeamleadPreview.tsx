import { NamedBlock } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface UserTeamsTeamleadPreviewProps {
  className?: string;
}

const UserTeamsTeamleadPreview: FC<UserTeamsTeamleadPreviewProps> = ({
  className,
}) => {
  return (
    <NamedBlock className={className} title="Команды" link="/user/teams">
      <ul className="flex flex-wrap text-center font-[0.9375rem] leading-7 text-[#898989] lg:text-left lg:text-sm xl:text-base">
        <li className="w-full text-primary sm:w-1/2">Габдрахманов С.А.</li>
        <li className="w-full sm:w-1/2">Иванов Е.К.</li>
        <li className="w-full sm:w-1/2">Сергеева А.Л.</li>
        <li className="w-full sm:w-1/2">Сергеева А.Л.</li>
        <li className="w-full sm:w-1/2">Вяземский С.К.</li>
      </ul>
      <div className="pt-7" />
      <div className="flex items-center">
        <div className="relative min-h-[2.5rem] min-w-[2.5rem]">
          <Image fill={true} src="/teamlead-icon.svg" alt="" />
        </div>
        <div className="pr-5" />
        <p className="font-bold">Вы являетесь представителем команды</p>
      </div>
    </NamedBlock>
  );
};

export default UserTeamsTeamleadPreview;
