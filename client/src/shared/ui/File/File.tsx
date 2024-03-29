import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FileProps {
  label: string;
  link: string;
  type?: string;
  size?: string;
}

const File: FC<FileProps> = ({ label, size, link, type = "FILE" }) => {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <div className="relative max-h-[1.5rem] min-h-[1.5rem] min-w-[1.75rem] max-w-[1.75rem]">
        <Image src="/file-icon-pdf.svg" fill={true} alt="PDF-файл" />
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
