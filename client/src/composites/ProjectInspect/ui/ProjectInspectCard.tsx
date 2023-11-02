import { IUser } from "@/entities/User";
import { Block, RoleTable } from "@/shared/ui";
import Image from "next/image";
import { FC } from "react";
import { ProjectInspect } from "../types/types";
import { getMembersByMemberIds } from "@/entities/Member";

interface ProjectInspectCardProps {
  user: IUser;
  projectInspect: ProjectInspect;
}

const ProjectInspectCard: FC<ProjectInspectCardProps> = ({
  user,
  projectInspect,
}) => {
  const { project, team, members, users } = projectInspect;

  const teamMembers = getMembersByMemberIds(team.members, members);

  const displayData = teamMembers.map((member) => {
    const teamUser = users.find((user) => user.id == member.user)!;

    return {
      id: member.id,
      role: member.role,
      name: teamUser.name,
      label: member.isAdministrator ? "Представитель команды" : null,
      selected: user.id == teamUser.id,
    };
  });

  return (
    <Block className="overflow-hidden rounded-2xl">
      <div className="bg-[#f4f4f4] px-9 pb-7 pt-11">
        <div className="w-3/4">
          <h2 className="text-xl font-semibold">{project.name}</h2>
          <div className="pt-5" />
          <div className="flex">
            <div className="w-1/3">
              <h3 className="text-[0.9375rem] text-[#898989]">
                Срок записи на проект
              </h3>
              <div className="pt-1" />
              <p className="text-[0.9375rem]">
                {project.enrollmentEnd.toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="w-1/3">
              <h3 className="text-[0.9375rem] text-[#898989]">
                Срок реализации проекта
              </h3>
              <div className="pt-1" />
              <p>
                {project.dateEnd.toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="w-1/3">
              <h3 className="text-[0.9375rem] text-[#898989]">Руководитель</h3>
              <div className="pt-1" />
              <p>{project.supervisor}</p>
            </div>
          </div>
        </div>
        <div className="pt-4" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-primary">Подробнее о проекте</span>
          <Image src="/arrow-right-red.svg" alt="" height={12} width={7} />
        </div>
      </div>
      <div className="pb-11">
        <RoleTable displayData={displayData} />
      </div>
    </Block>
  );
};

export default ProjectInspectCard;
