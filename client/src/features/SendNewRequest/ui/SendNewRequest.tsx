"use client";
import {
  Block,
  Button,
  Dropdown,
  FileUpload,
  LoadingCircle,
} from "@/shared/ui";
import { FC, useEffect, useState } from "react";
import { useAvailableRequestsQuery } from "../model/useAvailableRequestsQuery";
import { useNewRequestMutation } from "../model/useNewRequestMutation";

interface SendNewRequestProps {}

/* 
  <p className="text-[0.9375rem] text-[#898989]">Презентация команды</p>
  <div className="pt-4" />
  <ButtonAlt className="border px-8 py-2">Добавить</ButtonAlt>
*/

const SendNewRequest: FC<SendNewRequestProps> = () => {
  const { data } = useAvailableRequestsQuery();

  const [team, setTeam] = useState<string | null>(
    data?.teams.length == 1 ? data.teams[0].name : null || null,
  );
  const [project, setProject] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!team)
      setTeam(data?.teams.length == 1 ? data.teams[0].name : null || null);
  }, [data]);

  const { mutate, isLoading } = useNewRequestMutation();

  const handleConfirm = () => {
    if (!data || !selectedFiles || !selectedFiles.length) return;
    const teamSelected = data.teams.find(
      (teamMapped) => teamMapped.name == team,
    );
    const projectSelected = data.projectReferences.find(
      (projectMapped) => projectMapped.name == project,
    );

    if (!teamSelected || !projectSelected) return;

    mutate({
      teamId: teamSelected.id,
      files: selectedFiles,
      project: projectSelected.id,
    });

    setTeam(null);
    setProject(null);
  };

  if (!data || !data.teams.length) return <></>;

  if (isLoading)
    return (
      <div className="flex justify-center py-10">
        <LoadingCircle />
      </div>
    );

  return (
    <>
      <Block className="rounded-2xl px-11 py-10">
        <h2 className="text-xl font-semibold">Подать новую заявку</h2>
        <div className="pt-10" />
        <div className="flex gap-16">
          <div className="w-2/3">
            {data.teams.length > 1 && (
              <>
                <Dropdown
                  className="text-sm"
                  namePrefix="team"
                  placeholder="Команда"
                  options={data.teams.map((team) => team.name)}
                  value={team}
                  onChange={setTeam}
                />
                <div className="pt-10" />
              </>
            )}
            <Dropdown
              className="text-sm"
              namePrefix="project"
              placeholder="Проект"
              options={
                data.teams
                  .find((teamMapped) => teamMapped.name == team)
                  ?.projects.map(
                    (project) =>
                      data.projectReferences.find(
                        (projectRef) => projectRef.id == project,
                      )?.name!,
                  ) || []
              }
              value={project}
              onChange={setProject}
            />
          </div>
          <div className="w-1/3">
            <FileUpload
              large={true}
              name="Презентация"
              files={selectedFiles}
              label="Презентация команды"
              onChange={setSelectedFiles}
            />
          </div>
        </div>
        <div className="pt-7" />
        <Button className="px-14 py-3" onClick={handleConfirm}>
          Отправить
        </Button>
      </Block>
      <div className="pt-5" />
    </>
  );
};

export default SendNewRequest;
