"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface FileUploadProps {
  name: string;
  label: string;
  onChange?: (files: File[]) => any;
  large?: boolean;
  justify?: "start" | "end";
  items?: "start" | "center";
  files?: File[];
  fileListHeight?: number;
  actionText?: string;
}

const FILE_COUNT_LIMIT = 5;

const FileUpload: FC<FileUploadProps> = ({
  onChange,
  name,
  label,
  files = [],
  large = false,
  justify = "end",
  fileListHeight = 100,
  actionText = "Прикрепить",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>(files);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length)
      setSelectedFiles((prevFiles) =>
        [...prevFiles, ...files].slice(0, FILE_COUNT_LIMIT),
      );
  };

  const handleFileRemove = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement && e.target.dataset.delete) {
      Array.prototype.forEach.call(
        e.currentTarget.children,
        (child: HTMLElement, index: number) => {
          if (child.contains(e.target as HTMLElement)) {
            setSelectedFiles(
              selectedFiles.filter((_, indexMapped) => indexMapped != index),
            );
          }
        },
      );
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedFiles);
    }
  }, [selectedFiles]);

  useEffect(() => {
    if (files) setSelectedFiles(files);
  }, [files]);

  return (
    <div>
      <div
        className={
          `flex ${large ? "flex-col items-start" : "items-center"} ` +
            justify ==
          "start"
            ? "justify-start"
            : "justify-end"
        }
      >
        <p
          className={`pr-5 ${
            large ? "pb-5 text-lg text-[#898989]" : "text-sm"
          }`}
        >
          {label}
        </p>
        <div className="pt-5" />
        <div>
          <input
            id={name}
            type="file"
            accept=".jpg, .png, .jpeg, .docx, .pdf, .doc, .txt, .ppt, .pptx, .xls, .xlsx"
            multiple
            hidden
            onChange={handleFileChange}
          />
          {selectedFiles.length < FILE_COUNT_LIMIT && (
            <label
              className="cursor-pointer rounded-3xl border px-6 py-3 text-sm"
              htmlFor={name}
            >
              {actionText}
            </label>
          )}
        </div>
      </div>
      <div className="pt-3" />
      {selectedFiles.length > 0 && (
        <ul
          className={"mt-5 flex flex-col gap-2 overflow-y-auto pr-3"}
          style={{
            maxHeight: fileListHeight + "px",
          }}
          onClick={handleFileRemove}
        >
          {selectedFiles.map((file, index) => {
            return (
              <li key={file.name + index} className="flex items-center">
                <Image
                  src="/file-icon.svg"
                  height={20}
                  width={20}
                  alt="Загруженные файлы"
                />
                <span className="max-w-[calc(100%-55px)] overflow-hidden pl-2 pr-4">
                  {file.name}
                </span>
                <Image
                  data-delete
                  src="/x-gray.svg"
                  className="ml-auto cursor-pointer"
                  height={12}
                  width={12}
                  alt="Загруженные файлы"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
