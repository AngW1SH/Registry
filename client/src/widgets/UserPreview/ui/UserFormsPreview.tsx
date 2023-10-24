import { Button, NamedBlock } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";

interface UserFormsPreviewProps {
  className?: string;
}

const UserFormsPreview: FC<UserFormsPreviewProps> = ({ className }) => {
  return (
    <NamedBlock className={className} title={"Анкеты"}>
      <div className="flex h-full flex-col items-start">
        <div className="flex items-end">
          <p className="text-[#898989]">Вы заполнили анкет </p>
          <div className="pr-16" />
          <p className="flex items-center justify-center text-4xl font-medium">
            1
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
