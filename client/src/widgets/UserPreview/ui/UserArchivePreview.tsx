import Image from "next/image";
import { FC } from "react";

interface UserArchivePreviewProps {
  className?: string;
}

const UserArchivePreview: FC<UserArchivePreviewProps> = ({ className }) => {
  return (
    <div
      className={
        "flex flex-col items-center justify-center rounded-xl p-11 shadow-center-lg " +
        className
      }
    >
      <Image
        height={40}
        width={40}
        src="/project-status-done-icon-alt.svg"
        alt=""
      />
      <div className="pt-5" />
      <p className="whitespace-nowrap">Архив проектов</p>
    </div>
  );
};

export default UserArchivePreview;
