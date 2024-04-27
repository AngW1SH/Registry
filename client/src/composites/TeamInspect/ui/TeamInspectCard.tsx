import { Block, RoleTable } from "@/shared/ui";
import Link from "next/link";
import { FC, ReactElement } from "react";
import { TeamInspect } from "../types/types";
import { ITeamExtended } from "@/entities/Team";
import { IProject, getProjectsByProjectIds } from "@/entities/Project";
import { IUser, formatNameShort } from "@/entities/User";
import { IMember, getMembersByMemberIds } from "@/entities/Member";
import { IRequest, getRequestsByRequestIds } from "@/entities/Request";
import MemberInspect from "./MemberInspect";

interface TeamInspectCardProps {
  user: IUser;
  teamDetailed: TeamInspect;
  edit?: (ReactElement | null)[];
}

const TeamInspectCard: FC<TeamInspectCardProps> = ({
  user,
  teamDetailed,
  edit,
}) => {
  const { team, members, users, projects, requests } = teamDetailed;

  const membersPopulated = getMembersByMemberIds(team.members, members);

  const requestsProjects = team.requests
    ? getRequestsByRequestIds(team.requests, requests)
        .filter((request) => request.project)
        .map(
          (request) =>
            projects.find((project) => project.id == request.project!)!,
        )
    : [];

  const tableData = membersPopulated.map((member) => {
    const teamUser = users.find((userMapped) => userMapped.id == member.user)!;

    return {
      id: member.id,
      name: formatNameShort(teamUser.name),
      roles: member.roles,
      label: member.isAdministrator ? "Представитель команды" : null,
      selected: user.id == teamUser.id,
    };
  });

  return (
    <Block className="rounded-xl py-12">
      <ul>
        {tableData.map((data, index) => (
          <li
            key={data.id}
            className={
              "relative px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7] " +
              (data.selected ? "bg-secondary" : "")
            }
          >
            <MemberInspect
              data={data}
              edit={edit && edit[index] ? edit[index] : null}
            />
          </li>
        ))}
      </ul>
      <div className="px-10">
        <div className="pt-16" />
        <div>
          <p className="text-[0.8125rem] text-[#898989]">Проект команды</p>
          {team.project ? (
            <p>
              {projects.find((project) => project.id == team.project)?.name}
            </p>
          ) : (
            <p>Пока нет проекта</p>
          )}
        </div>
        <div className="pt-10" />
        {!team.project && (
          <div>
            <p className="text-[0.8125rem] text-[#898989]">Заявки команды</p>
            {requestsProjects.length > 0 ? (
              <ul>
                {requestsProjects.map((project) => (
                  <li key={project.id}>
                    <Link href="/projects/1">{project.name}</Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Пока нет заявок</p>
            )}
          </div>
        )}
      </div>
    </Block>
  );
};

export default TeamInspectCard;
