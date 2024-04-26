"use client";
import { Button, ButtonAlt, Dropdown } from "@/shared/ui";
import { FC, useRef, useState } from "react";
import { useAddProjectFileMutation } from "../model/useAddProjectFilesMutation";
import Image from "next/image";

interface AddProjectFilesProps {
  projectId: string;
}

const AddProjectFiles: FC<AddProjectFilesProps> = ({ projectId }) => {
  const { mutate: addFiles, isLoading } = useAddProjectFileMutation();

  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectFiles = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmitFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      addFiles({ projectId, files: Array.from(e.target.files) });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-wrap items-end justify-between gap-y-4">
      <input
        ref={inputRef}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        type="file"
        accept=".jpg, .png, .jpeg, .docx, .pdf, .doc, .txt"
        hidden
      />
      {!!file && (
        <p className="flex w-full items-center border-b border-black pb-2 text-sm sm:max-w-[48%] lg:mr-10 lg:max-w-[200px]">
          <Image
            src="/file-icon.svg"
            height={20}
            width={20}
            alt="Загруженные файлы"
          />
          <span
            className="max-w-[calc(100%-55px)] overflow-hidden text-ellipsis whitespace-nowrap pl-2 pr-4"
            title={file.name}
          >
            {file.name}
          </span>
          <Image
            onClick={() => setFile(null)}
            src="/x-gray.svg"
            className="ml-auto cursor-pointer"
            height={12}
            width={12}
            alt="Загруженные файлы"
          />
        </p>
      )}
      {!file && (
        <ButtonAlt
          type="button"
          className="mt-2 w-full whitespace-nowrap rounded-full border border-black px-8 py-2 text-sm font-normal sm:max-w-[48%] lg:mr-10 lg:max-w-[200px]"
          onClick={handleSelectFiles}
        >
          Выберите файл
        </ButtonAlt>
      )}
      <Dropdown
        namePrefix="new-file-type"
        placeholder="Тип файла"
        options={["Отчёт", "Схема"]}
        value={fileType}
        onChange={setFileType}
        className="text-sm sm:max-w-[48%] lg:max-w-[200px]"
      />
      <Button
        type="button"
        className="rounded-full px-10 py-2 lg:ml-auto"
        onClick={handleSubmit}
      >
        Добавить
      </Button>
    </form>
  );
};

export default AddProjectFiles;
