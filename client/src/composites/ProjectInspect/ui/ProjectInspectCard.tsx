import { IUser } from "@/entities/User";
import { Block, RoleTable, ToggleOpen } from "@/shared/ui";
import Image from "next/image";
import { FC, ReactNode, useRef } from "react";
import { ProjectInspect } from "../types/types";
import { getMembersByMemberIds } from "@/entities/Member";
import { useToggleOpen } from "@/shared/hooks";
import { Transition, TransitionStatus } from "react-transition-group";

interface ProjectInspectCardProps {
  user: IUser;
  projectInspect: ProjectInspect;
  edit: ReactNode;
}

const ProjectInspectCard: FC<ProjectInspectCardProps> = ({
  user,
  projectInspect,
  edit,
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

  const editRef = useRef<HTMLDivElement>(null);

  const { opened, toggleOpened, styles } = useToggleOpen(editRef);

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
        <div className="flex justify-between">
          <div className="flex cursor-pointer items-center gap-2">
            <span className="text-sm text-primary">Подробнее о проекте</span>
            <Image src="/arrow-right-red.svg" alt="" height={12} width={7} />
          </div>
          <div
            onClick={toggleOpened}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="text-sm text-primary">Редактировать</span>
            <Image
              className="rotate-90"
              src="/arrow-right-red.svg"
              alt=""
              height={12}
              width={7}
            />
          </div>
        </div>
      </div>
      <Transition in={opened} timeout={150}>
        {(state: TransitionStatus) => (
          <div
            className={`relative ${
              state == "entered" ? "overflow-visible" : "overflow-hidden"
            }`}
          >
            <div
              className="relative"
              style={{
                ...styles.default,
                ...styles.transition[state],
              }}
            >
              <div ref={editRef} className="px-9 py-6">
                {edit}
              </div>
            </div>
          </div>
        )}
      </Transition>
      <div className="pb-11">
        <RoleTable displayData={displayData} />
      </div>
    </Block>
  );
};

export default ProjectInspectCard;
