import { NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface UserTeamsPreviewProps {
  className?: string;
}

const UserTeamsPreview: FC<UserTeamsPreviewProps> = ({ className }) => {
  return (
    <NamedBlock className={className} title="Команды">
      <ul className="flex flex-wrap text-center font-[0.9375rem] leading-7 text-[#898989] lg:text-left lg:text-sm xl:text-base">
        <li className="w-full text-primary sm:w-1/2">Габдрахманов С.А.</li>
        <li className="w-full sm:w-1/2">Иванов Е.К.</li>
        <li className="w-full sm:w-1/2">Сергеева А.Л.</li>
        <li className="w-full sm:w-1/2">Сергеева А.Л.</li>
        <li className="w-full sm:w-1/2">Вяземский С.К.</li>
      </ul>
    </NamedBlock>
  );
};

export default UserTeamsPreview;
