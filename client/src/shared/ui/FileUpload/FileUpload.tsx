"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface FileUploadProps {
  name: string;
  label: string;
  onChange?: (files: File[] | null) => any;
  large?: boolean;
  justify?: "start" | "end";
}

const FileUpload: FC<FileUploadProps> = ({
  onChange,
  name,
  label,
  large = false,
  justify = "end",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleFileRemove = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLElement) {
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
        <div>
          <input
            id={name}
            type="file"
            accept=".jpg, .png, .jpeg, .docx, .pdf, .doc, .txt"
            multiple
            hidden
            onChange={handleFileChange}
          />
          <label
            className="cursor-pointer rounded-3xl border px-6 py-3 text-sm"
            htmlFor={name}
          >
            Прикрепить
          </label>
        </div>
      </div>
      {selectedFiles.length > 0 && (
        <div className="mt-5 overflow-y-auto" onClick={handleFileRemove}>
          {selectedFiles.map((file, index) => {
            return (
              <p key={file.name + index} className="flex items-center">
                <Image
                  src="/file-icon.svg"
                  height={20}
                  width={20}
                  alt="Загруженные файлы"
                />
                <span className="pl-2 pr-4">{file.name}</span>
                <Image
                  src="/x-gray.svg"
                  className="cursor-pointer"
                  height={12}
                  width={12}
                  alt="Загруженные файлы"
                />
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
