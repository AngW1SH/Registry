"use client";
import { Button } from "@/shared/ui";
import { FC, useRef } from "react";
import { useAddProjectFileMutation } from "../model/useAddProjectFilesMutation";

interface AddProjectFilesProps {
  projectId: number;
}

const AddProjectFiles: FC<AddProjectFilesProps> = ({ projectId }) => {
  const { mutate: addFiles, isLoading } = useAddProjectFileMutation();

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

  return (
    <form>
      <input
        ref={inputRef}
        onChange={handleSubmitFiles}
        type="file"
        accept=".jpg, .png, .jpeg, .docx, .pdf, .doc, .txt"
        multiple
        hidden
      />
      <Button
        type="button"
        className="rounded-full px-8 py-2"
        onClick={handleSelectFiles}
      >
        Добавить отчёт
      </Button>
    </form>
  );
};

export default AddProjectFiles;
