"use client";
import { getMembersByMemberIds } from "@/entities/Member";
import { Block, ButtonAlt, File } from "@/shared/ui";
import { FC, ReactNode, useState } from "react";
import { RequestInspect } from "../types/types";
import { IUser, formatNameShort } from "@/entities/User";

interface RequestInspectCardProps {
  user: IUser;
  requestInspect: RequestInspect;
  editFiles?: ReactNode;
}

const RequestInspectCard: FC<RequestInspectCardProps> = ({
  user,
  requestInspect,
  editFiles,
}) => {
  const { request, teams, members, users, projects } = requestInspect;

  const team = teams.find((team) => team.id == request.team);

  const project = projects.find((project) => project.id == request.project);

  const membersPopulated = team
    ? getMembersByMemberIds(team.members, members)
    : [];

  const displayData = membersPopulated.map((member) => {
    const teamUser = users.find((userMapped) => userMapped.id == member.user)!;

    return {
      id: member.id,
      name: formatNameShort(teamUser.name),
    };
  });

  const [files, setFiles] = useState<File[] | null>(null);

  return (
    <Block className="relative w-full rounded-2xl px-11 py-8">
      <div className="w-3/4">
        <h3 className="text-sm text-[#898989]">Заявка на проект</h3>
        <div className="pt-1" />
        <p className="text-lg">{project ? project.name : ""}</p>
        <div className="pt-9" />
        <h3 className="text-sm text-[#898989]">Команда</h3>
        <div className="pt-1" />
        {displayData.length > 0 && (
          <ul className="flex flex-wrap">
            {displayData.map((data) => (
              <li key={data.id} className="w-[45%]">
                {data.name}
              </li>
            ))}
          </ul>
        )}
        <div className="pt-9" />
        <h3 className="text-sm text-[#898989]">Статус</h3>
        <div className="pt-1" />
        <div className="text-xl font-semibold">
          <p>В рассмотрении</p>
        </div>
        <div className="pt-4" />
        <ButtonAlt className="rounded-full border px-16 py-[0.65rem]">
          Отозвать
        </ButtonAlt>
      </div>
      <div className="absolute right-0 top-4 px-11 py-8">
        {request.files.map((file) => (
          <File
            key={file.id}
            label={"Название файла"}
            link={file.url}
            type={file.type}
            size={file.size}
          />
        ))}
        <div className="pt-8" />
        {editFiles}
      </div>
    </Block>
  );
};

export default RequestInspectCard;
