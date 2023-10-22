"use client";
import { IProject } from "@/entities/Project";
import { ITeam } from "@/entities/Team";
import { Button, Dropdown, FileUpload, LoadingCircle } from "@/shared/ui";
import { FC, useState } from "react";
import { useRequestMutation } from "../model/useRequestMutation";
import Image from "next/image";

interface SendRequestProps {
  project: IProject;
  assignableTeams: ITeam[];
}

const SendRequest: FC<SendRequestProps> = ({ project, assignableTeams }) => {
  const [selected, setSelected] = useState<ITeam | null>(assignableTeams[0]);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>([]);
  const { mutate: sendRequest, status } = useRequestMutation();

  const handleSubmit = () => {
    if (selected && selectedFiles && selectedFiles.length) {
      sendRequest({
        team: selected.id,
        files: selectedFiles,
        project: project.id,
      });
    }
  };

  if (status == "loading") {
    return (
      <div className="flex h-full w-full items-center justify-center pb-10">
        <LoadingCircle />;
      </div>
    );
  }

  if (status == "error") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center pb-12 text-center">
        <h2 className="text-3xl text-primary">
          Произошла ошибка при отправке заявки
        </h2>
        <div className="pt-7" />
        <p>
          Пожалуйста, попробуйте обновить страницу и отправить заявку ещё раз
        </p>
      </div>
    );
  }

  if (status == "success") {
    return (
      <>
        <div className="flex h-full w-full flex-col items-center justify-center pb-10">
          <h2 className="-mt-6 text-center text-4xl text-primary">
            Заявка успешно отправлена
          </h2>
          <div className="pt-6" />
          <div className="h-14 w-14 min-w-[2.5rem] rounded-full border-[3px] border-primary p-[1rem]">
            <div className="relative h-full w-full">
              <Image src="/checked-icon-red.svg" fill={true} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {assignableTeams.length > 1 && (
        <>
          <Dropdown
            value={selected ? selected.name : ""}
            onChange={(changed: string) => setSelected}
            placeholder="Команда"
            namePrefix="team"
            options={assignableTeams.map((team) => team.name)}
          />
          <div className="pt-7" />
        </>
      )}
      <FileUpload
        name="team-document"
        label="Презентация команды"
        onChange={setSelectedFiles}
      />
      <Button className="mt-auto block self-center px-9" onClick={handleSubmit}>
        Отправить
      </Button>
    </>
  );
};

export default SendRequest;
