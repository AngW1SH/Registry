"use client";
import { Button, ButtonAlt, Dropdown } from "@/shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { useAddProjectFileMutation } from "../model/useAddProjectFilesMutation";
import Image from "next/image";
import { useProjectFileTypeQuery } from "@/entities/Project";

interface AddProjectFilesProps {
  projectId: string;
  teamId: number;
}

const AddProjectFiles: FC<AddProjectFilesProps> = ({ projectId, teamId }) => {
  const { mutate: addFile, isLoading, data } = useAddProjectFileMutation();

  const { data: allFileTypes } = useProjectFileTypeQuery();

  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectFiles = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    if (file && fileType && !isLoading)
      addFile({ teamId, projectId, file, category: fileType });
  };

  useEffect(() => {
    if (data) {
      setFileType(null);
      setFile(null);
    }
  }, [data]);

  return (
    <form className="flex flex-wrap items-end justify-between gap-y-4 md:flex-nowrap">
      <input
        ref={inputRef}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        type="file"
        accept=".jpg, .png, .jpeg, .docx, .pdf, .doc, .txt, .ppt, .pptx, .xls, .xlsx"
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
        options={allFileTypes || []}
        value={fileType}
        onChange={setFileType}
        className="mr-10 text-sm sm:max-w-[48%]"
      />
      <Button
        type="button"
        className={`rounded-full px-10 py-2 lg:ml-auto`}
        style={{
          backgroundColor: isLoading ? "#b7b7b7" : undefined,
          color: isLoading ? "black" : undefined,
        }}
        onClick={handleSubmit}
      >
        {!isLoading && "Загрузить"}
        {isLoading && "Загрузка..."}
      </Button>
    </form>
  );
};

export default AddProjectFiles;
