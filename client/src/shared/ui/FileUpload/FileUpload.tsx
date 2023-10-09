"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface FileUploadProps {
  name: string;
  label: string;
  onChange?: (files: File[] | null) => any;
}

const FileUpload: FC<FileUploadProps> = ({ onChange, name, label }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length) setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedFiles);
    }
  }, [selectedFiles]);

  return (
    <div className="flex items-center justify-end">
      {selectedFiles.length > 0 && (
        <div className="flex items-center pr-5">
          {selectedFiles.length > 1 && (
            <span className="pr-3 font-bold">{selectedFiles.length}</span>
          )}

          <Image
            src="/file-icon.svg"
            height={20}
            width={20}
            alt="Загруженные файлы"
          />
        </div>
      )}
      {selectedFiles.length == 0 && <p className="pr-5 text-sm">{label}</p>}
      <div>
        <input
          id={name}
          type="file"
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
  );
};

export default FileUpload;
