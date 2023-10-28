import { Block } from "@/shared/ui";
import Link from "next/link";
import { FC } from "react";
import { TeamDetailed } from "../types/types";
import { ITeamExtended } from "@/entities/Team";
import { IProject, getProjectsByProjectIds } from "@/entities/Project";
import { IUser, formatNameShort } from "@/entities/User";
import { IMember, getMembersByMemberIds } from "@/entities/Member";
import { IRequest, getRequestsByRequestIds } from "@/entities/Request";

interface TeamDetailedCardProps {
  team: ITeamExtended;
  projects: IProject[];
  users: IUser[];
  members: IMember[];
  requests: IRequest[];
}

const TeamDetailedCard: FC<TeamDetailedCardProps> = (props: TeamDetailed) => {
  const { team, members, users, projects, requests } = props;

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
        {displayData.map(({ member, user }) => (
          <li
            key={member.id}
            className="px-10 [&:last-child>div]:border-b [&>div]:border-t [&>div]:border-[#b7b7b7]"
          >
            <div className="flex items-center py-5">
              <p className="w-1/3">{member.role}</p>
              <p className="text-lg font-medium uppercase">
                {formatNameShort(user.name)}
              </p>
              {member.isAdministator === true && (
                <p className="ml-10 text-[0.9375rem] text-primary">
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

export default TeamDetailedCard;
