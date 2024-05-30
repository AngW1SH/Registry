import Image from "next/image";
import { FC } from "react";

interface FileIconProps {
  type: string;
}

const FileIcon: FC<FileIconProps> = ({ type }) => {
  switch (type.toUpperCase()) {
    case "PDF":
      return <Image src="/pdf-icon.svg" fill={true} alt="PDF-файл" />;
    case "DOC":
      return <Image src="/doc-icon.svg" fill={true} alt="DOC-файл" />;
    case "DOCX":
      return <Image src="/docx-icon.svg" fill={true} alt="DOCX-файл" />;
    case "XLS":
      return <Image src="/xls-icon.svg" fill={true} alt="XLS-файл" />;
    case "XLSX":
      return <Image src="/xlsx-icon.svg" fill={true} alt="XLSX-файл" />;
    case "PPT":
      return <Image src="/ppt-icon.svg" fill={true} alt="PPT-файл" />;
    case "PPTX":
      return <Image src="/pptx-icon.svg" fill={true} alt="PPTX-файл" />;
    case "JPG":
      return <Image src="/jpg-icon.svg" fill={true} alt="JPG-файл" />;
    case "JPEG":
      return <Image src="/jpeg-icon.svg" fill={true} alt="JPEG-файл" />;
    case "PNG":
      return <Image src="/png-icon.svg" fill={true} alt="PNG-файл" />;
    default:
      return <Image src="/unknown-file-icon.svg" alt="Файл" />;
  }
};

export default FileIcon;
