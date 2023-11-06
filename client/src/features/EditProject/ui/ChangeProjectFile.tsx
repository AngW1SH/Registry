import Image from "next/image";
import { FC } from "react";

interface ChangeProjectFileProps {
  className?: string;
}

const ChangeProjectFile: FC<ChangeProjectFileProps> = ({ className = "" }) => {
  return (
    <div
      className={
        "group h-7 w-7 cursor-pointer overflow-hidden rounded-full transition-[background-color,border]  " +
        className
      }
    >
      <Image
        className=""
        src="/file-change-icon.svg"
        alt="Заменить файл"
        fill={true}
      />
    </div>
  );
};

export default ChangeProjectFile;
