import { Request } from "@/entities/request";
import { RequestInfoListStrapi, RequestListStrapi } from "../../types/request";
import { getTeamFromStrapiDTO, getTeamListFromStrapiDTO } from "../team";
import { Team } from "@/entities/team";
import { Member } from "@/entities/member";
import { User } from "@/entities/user";
import { TeamStrapi } from "../../types/team";
import { TeamWithAdministrators } from "@/entities/team/types/types";

export const getRequestInfoListFromStrapiDTO = (
  requests: RequestInfoListStrapi
): Request[] => {
  return requests.data.map((request) => ({
    id: request.id,
    team: request.attributes.team?.data
      ? request.attributes.team.data.id
      : null,
    project: request.attributes.project?.data
      ? request.attributes.project.data.id
      : null,
  }));
};

export const getRequestListFromStrapiDTO = (
  requests: RequestListStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  requests: Request[] | null;
  teams: Team[] | TeamWithAdministrators[] | null;
  users: User[] | null;
  administrators: User[] | null;
  members: Member[] | null;
} => {
  const usedTeamIds = new Set();
  const teams: Team[] = [];

  const usedMemberIds = new Set();
  const members: Member[] = [];

  const usedUserIds = new Set();
  const users: User[] = [];

  const usedAdministratorIds = new Set();
  const administrators: User[] = [];

  requests.data?.[0]?.attributes?.hasOwnProperty("name") &&
    requests.data.forEach((teamStrapi) => {
      const {
        team,
        users: teamUsers,
        administrators: teamAdmins,
        members: teamMembers,
      } = getTeamFromStrapiDTO({ data: teamStrapi } as TeamStrapi, options);

      if (team && !usedTeamIds.has(team.id)) {
        usedTeamIds.add(team.id);
        teams.push(team);
      }

      teamUsers &&
        teamUsers.forEach((teamUser) => {
          if (usedUserIds.has(teamUser.id)) return;

          usedUserIds.add(teamUser.id);
          users.push(teamUser);
        });

      teamMembers &&
        teamMembers.forEach((teamMember) => {
          if (usedMemberIds.has(teamMember.id)) return;

          usedMemberIds.add(teamMember.id);
          members.push(teamMember);
        });

      teamAdmins &&
        teamAdmins.forEach((teamAdmin) => {
          if (usedAdministratorIds.has(teamAdmin.id)) return;

          usedAdministratorIds.add(teamAdmin.id);
          administrators.push(teamAdmin);
        });
    });

  return {
    requests: requests.data.map((request) => ({
      id: request.id,
      team: request.attributes.team?.data
        ? request.attributes.team.data.id
        : null,
    })),
    administrators,
    users,
    teams,
    members,
  };
};
