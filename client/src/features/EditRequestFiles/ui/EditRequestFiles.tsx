"use client";
import { IRequest } from "@/entities/Request";
import { Button, FileUpload } from "@/shared/ui";
import { FC, useState } from "react";
import { useRequestFilesMutation } from "../model/useReqestFilesMutation";

interface EditRequestFilesProps {
  request: IRequest;
}

const EditRequestFiles: FC<EditRequestFilesProps> = ({ request }) => {
  const [files, setFiles] = useState<File[] | null>(null);

  const { mutate: changeRequestFiles, status } = useRequestFilesMutation();

  return (
    <>
      <FileUpload
        justify="start"
        name={request.id + "-files"}
        label=""
        onChange={setFiles}
      />
      {files && files.length > 0 && (
        <Button
          onClick={() =>
            request.team && changeRequestFiles({ files, requestId: request.id })
          }
          className="mt-6 rounded-full px-10 py-3 text-sm"
        >
          Подтвердить
        </Button>
      )}
    </>
  );
};

export default EditRequestFiles;
