"use client";
import { staticProjects } from "@/entities/Project";
import { staticTeams } from "@/entities/Team";
import {
  Block,
  Button,
  ButtonAlt,
  Dropdown,
  FileUpload,
  FormInput,
} from "@/shared/ui";
import { FC, useState } from "react";

interface SendNewRequestProps {}

/* 
  <p className="text-[0.9375rem] text-[#898989]">Презентация команды</p>
  <div className="pt-4" />
  <ButtonAlt className="border px-8 py-2">Добавить</ButtonAlt>
*/

const SendNewRequest: FC<SendNewRequestProps> = () => {
  const [team, setTeam] = useState<string | null>(null);
  const [project, setProject] = useState<string | null>(null);

  const [selected, setSelected] = useState("");

  return (
    <>
      <div className="flex gap-16">
        <div className="w-2/3">
          <Dropdown
            className="text-sm"
            namePrefix="team"
            placeholder="Команда"
            options={staticTeams.map((team) => team.name)}
            value={team}
            onChange={setTeam}
          />
          <div className="pt-10" />
          <Dropdown
            className="text-sm"
            namePrefix="project"
            placeholder="Проект"
            options={staticProjects.map((project) => project.name)}
            value={project}
            onChange={setProject}
          />
        </div>
        <div className="w-1/3">
          <FileUpload
            large={true}
            name="Презентация"
            label="Презентация команды"
          />
        </div>
      </div>
      <div className="pt-7" />
      <Button className="px-14 py-3">Отправить</Button>
    </>
  );
};

export default SendNewRequest;
