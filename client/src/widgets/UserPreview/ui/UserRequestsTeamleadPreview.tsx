import { Button, NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface UserRequestsTeamleadPreviewProps {
  className?: string;
}

const UserRequestsTeamleadPreview: FC<UserRequestsTeamleadPreviewProps> = ({
  className,
}) => {
  return (
    <NamedBlock className={className} title={"Заявки на проекты"}>
      <div className="flex h-full flex-col items-start">
        <div className="flex items-end">
          <p className="font-[0.9375rem] text-[#898989]">
            Представителями
            <br />
            ваших команд подано заявок
          </p>
          <div className="pr-16" />
          <p className="flex items-center justify-center text-4xl font-medium">
            3
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

export default UserRequestsTeamleadPreview;
