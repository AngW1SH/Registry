import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FileProps {
  label: string;
  link: string;
  type?: string;
  size?: string;
}

const File: FC<FileProps> = ({ label, size, link, type }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-6 w-7">
        <Image src="/file-icon-pdf.svg" fill={true} alt="PDF-файл" />
      </div>
      <p>
        <a
          className="text-primary"
          href={process.env.NEXT_PUBLIC_STRAPI_URL + link}
        >
          {label}
        </a>
      </p>
      <p>(PDF, {size} )</p>
    </div>
  );
};

export default File;
