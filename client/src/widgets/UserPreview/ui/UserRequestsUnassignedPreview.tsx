import { Button, NamedBlock } from "@/shared/ui";
import { FC } from "react";

interface UserRequestsUnassignedPreviewProps {
  className?: string;
}

const UserRequestsUnassignedPreview: FC<UserRequestsUnassignedPreviewProps> = ({
  className,
}) => {
  return (
    <NamedBlock
      className={className}
      title={"Заявки на проекты"}
      link="/user/requests"
    >
      <div className="flex h-full flex-col items-start">
        <p className="font-[0.9375rem] text-[#898989]">
          После распределения в команду
          <br />
          здесь будут отображены заявки на проекты
        </p>
      </div>
    </NamedBlock>
  );
};

export default UserRequestsUnassignedPreview;
