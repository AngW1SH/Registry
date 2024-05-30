import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import FileIcon from "./FileIcon";

interface FileProps {
  label: string;
  link: string;
  type?: string;
  size?: string;
  className?: string;
}

const File: FC<FileProps> = ({
  label,
  size,
  link,
  type = "FILE",
  className = "",
}) => {
  return (
    <div className={"flex items-center gap-2 overflow-hidden " + className}>
      <div className="relative max-h-[1.5rem] min-h-[1.5rem] min-w-[1.75rem] max-w-[1.75rem]">
        <FileIcon type={type.toUpperCase()} />
      </div>
      <p
        className="overflow-hidden text-ellipsis whitespace-nowrap text-primary"
        title={label}
      >
        <a href={process.env.NEXT_PUBLIC_STRAPI_URL + link}>{label}</a>
      </p>
      <p className="whitespace-nowrap">
        {type}, {size}
      </p>
    </div>
  );
};

export default File;
