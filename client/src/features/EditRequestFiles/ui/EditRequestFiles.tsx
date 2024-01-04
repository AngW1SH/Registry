"use client";
import { IRequest } from "@/entities/Request";
import { Button, FileUpload } from "@/shared/ui";
import { FC, useState } from "react";
import { useRequestFilesMutation } from "../model/useRequestFilesMutation";

interface EditRequestFilesProps {
  request: IRequest;
}

const EditRequestFiles: FC<EditRequestFilesProps> = ({ request }) => {
  const [files, setFiles] = useState<File[]>([]);

  const { mutate: changeRequestFiles, status } = useRequestFilesMutation();

  const handleConfirm = () => {
    if (request.team && files) {
      changeRequestFiles({ files, requestId: request.id });
    }
    setFiles([]);
  };

  return (
    <>
      <FileUpload
        justify="start"
        name={request.id + "-files"}
        label=""
        files={files}
        onChange={setFiles}
        actionText="Заменить файлы"
      />
      {files && files.length > 0 && (
        <Button
          onClick={handleConfirm}
          className="mt-6 rounded-full px-10 py-3 text-sm"
        >
          Подтвердить
        </Button>
      )}
    </>
  );
};

export default EditRequestFiles;
