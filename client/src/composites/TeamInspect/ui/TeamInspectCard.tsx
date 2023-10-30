import { Block } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";
import { TeamInspect } from "../types/types";
import { ITeamExtended } from "@/entities/Team";
import { IProject, getProjectsByProjectIds } from "@/entities/Project";
import { IUser, formatNameShort } from "@/entities/User";
import { IMember, getMembersByMemberIds } from "@/entities/Member";
import { IRequest, getRequestsByRequestIds } from "@/entities/Request";

interface TeamInspectCardProps {
  user: IUser;
  teamDetailed: TeamInspect;
}

const TeamInspectCard: FC<TeamInspectCardProps> = ({ user, teamDetailed }) => {
  const { team, members, users, projects, requests } = teamDetailed;

  const membersPopulated = getMembersByMemberIds(team.members, members);

  // Get corresponding user for each member
  const displayData = membersPopulated.map((member) => ({
    member,
    user: users.find((userMapped) => userMapped.id == member.user)!,
  }));

  const requestsProjects = team.requests
    ? getRequestsByRequestIds(team.requests, requests)
        .filter((request) => request.project)
        .map(
          (request) =>
            projects.find((project) => project.id == request.project!)!,
        )
    : [];

  return (
    <Block className="rounded-xl py-12">
      <ul>
        {displayData.map(({ member, user: teamUser }) => (
          <li
            key={member.id}
            className={
              "relative px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7] " +
              (user.id == teamUser.id ? "bg-secondary" : "")
            }
          >
            <div
              className={
                "flex flex-col items-center py-3 sm:flex-row sm:py-5 " +
                (member.isAdministrator ? "pt-8" : "")
              }
            >
              <p className="sm:w-min sm:min-w-[40%]">{member.role}</p>
              <p className="whitespace-nowrap pl-2 pt-1 font-bold uppercase sm:pt-0 sm:font-medium md:text-lg">
                {formatNameShort(teamUser.name)}
              </p>
              {member.isAdministrator && (
                <p className="absolute left-0 top-2 w-full text-center text-[0.9375rem] text-primary sm:static sm:ml-10 sm:w-auto sm:text-left">
                  Представитель команды
                </p>
              )}
            </div>
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
