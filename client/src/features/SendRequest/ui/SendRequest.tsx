"use client";
import { useAuthUserQuery } from "@/composites/AuthUser";
import { IProject } from "@/entities/Project";
import { ITeam, getTeamsByTeamIds } from "@/entities/Team";
import { Button, Dropdown, FileUpload } from "@/shared/ui";
import { FC, useMemo, useState } from "react";
import { sendRequest } from "../api/sendRequest";

interface SendRequestProps {
  project: IProject;
  assignableTeams: ITeam[];
}

const SendRequest: FC<SendRequestProps> = ({ project, assignableTeams }) => {
  const [selected, setSelected] = useState<ITeam | null>(assignableTeams[0]);
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>([]);

  const handleSubmit = () => {
    if (selected && selectedFiles && selectedFiles.length)
      sendRequest(selected.id, selectedFiles, project.id);
  };

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
