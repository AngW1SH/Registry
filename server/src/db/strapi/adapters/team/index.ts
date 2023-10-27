import { Team } from "@/entities/team";
import { TeamListStrapi, TeamStrapi } from "../../types/team";
import type { User } from "@/entities/user";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { RequestInfoListStrapi, RequestStrapi } from "../../types/request";
import { getUserFromStrapiDTO } from "../user";
import { Member } from "@/entities/member";
import { getMemberListFromStrapiDTO } from "../member";
import { Request } from "@/entities/request";
import { MemberListStrapi } from "../../types/member";

export const getTeamFromStrapiDTO = (
  team: TeamStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  team: Team | TeamWithAdministrators | null;
  users: User[] | null;
  members: Member[] | null;
  administrators: User[] | null;
} => {
  if (!team.data)
    return { team: null, users: null, members: null, administrators: null };

  const { members, users, administrators } =
    team.data.attributes.members?.hasOwnProperty("attributes")
      ? getMemberListFromStrapiDTO(
          team.data.attributes.members as MemberListStrapi,
          {
            team,
            includeAdmin: options?.includeAdmin,
          }
        )
      : { members: [], users: [], administrators: [] };

  return {
    team: {
      id: team.data.id,
      name: team.data.attributes.name,
      members: members.map((member) => member.id),
      project: team.data.attributes.project?.data
        ? team.data.attributes.project.data.id
        : null,
      ...(options?.includeAdmin && administrators.map((admin) => admin.id)),
    },
    users,
    members,
    administrators,
  };
};

export const getTeamListFromStrapiDTO = (
  teams: TeamListStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  teams: Team[] | TeamWithAdministrators[] | null;
  members: Member[] | null;
  users: User[] | null;
  administrators: User[] | null;
} => {
  if (!teams.data)
    return { teams: null, users: null, members: null, administrators: null };

  const usedUserIds = new Set();
  const users: User[] = [];

  const usedMemberIds = new Set();
  const members: Member[] = [];

  const usedAdminIds = new Set();
  const administrators: User[] = [];

  teams.data.forEach((team) => {
    const {
      members: teamMembers,
      users: teamUsers,
      administrators: teamAdministrators,
    } = team.attributes.members?.data.hasOwnProperty("attributes")
      ? getMemberListFromStrapiDTO(
          team.attributes.members as MemberListStrapi,
          { includeAdmin: options?.includeAdmin, team: { data: team } }
        )
      : { members: null, users: null, administrators: null };

    teamUsers &&
      teamUsers.forEach((user) => {
        if (usedUserIds.has(user.id)) return;
        users.push(user);
      });

    teamMembers &&
      teamMembers.forEach((member) => {
        if (usedMemberIds.has(member.id)) return;
        members.push(member);
      });

    teamAdministrators &&
      teamAdministrators.forEach((administrator) => {
        if (usedAdminIds.has(administrator.id)) return;
        administrators.push(administrator);
      });
  });

  return {
    teams: teams.data.map((team) => ({
      id: team.id,
      name: team.attributes.name,
      members: members.map((member) => member.id),
      project: team.attributes.project?.data
        ? team.attributes.project.data.id
        : null,
      ...(options?.includeAdmin && {
        administrators: administrators.map((admin) => admin.id),
      }),
    })),
    users,
    members,
    administrators,
  };
};

export const getRequestFromStrapiDTO = (
  request: RequestStrapi
): {
  team: Team | null;
  users: User[] | null;
  members: Member[] | null;
  administrators: User[] | null;
} => {
  return request.data && request.data.attributes.team
    ? getTeamFromStrapiDTO(request.data.attributes.team)
    : {
        team: null,
        users: null,
        members: null,
        administrators: null,
      };
};
