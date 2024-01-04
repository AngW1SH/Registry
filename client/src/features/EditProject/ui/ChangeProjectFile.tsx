import Image from "next/image";
import { FC, useRef } from "react";
import { useChangeProjectFileMutation } from "../model/useChangeProjectFilesMutation";

interface ChangeProjectFileProps {
  projectId: number;
  fileId: number;
  className?: string;
}

const ChangeProjectFile: FC<ChangeProjectFileProps> = ({
  projectId,
  fileId,
  className = "",
}) => {
  const { mutate: addFiles, isLoading } = useChangeProjectFileMutation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmitFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files)
      addFiles({ projectId, fileId, files: Array.from(e.target.files) });
  };

  return (
    <form>
      <input
        ref={inputRef}
        onChange={handleSubmitFiles}
        type="file"
        accept=".jpg, .png, .jpeg, .docx, .pdf, .doc, .txt"
        hidden
      />
      <button
        type="button"
        onClick={handleSelectFile}
        className={
          "group h-7 w-7 cursor-pointer overflow-hidden rounded-full transition-[background-color,border]  " +
          className
        }
      >
        <Image
          className=""
          src="/file-change-icon.svg"
          alt="Заменить файл"
          fill={true}
        />
      </button>
    </form>
  );
};

export default ChangeProjectFile;
