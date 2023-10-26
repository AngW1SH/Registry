import { Team } from "@/entities/team";
import {
  TeamListStrapiPopulated,
  TeamStrapiPopulated,
  TeamStrapiPopulatedWithAdministrators,
} from "../../types/team";
import type { User } from "@/entities/user";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { RequestInfoListStrapi, RequestStrapiInner } from "../../types/request";
import { getUserFromStrapiDTO } from "../user";
import { Member } from "@/entities/member";
import { getMemberListFromStrapiDTO } from "../member";
import { Request } from "@/entities/request";

export const getTeamFromStrapiDTO = (
  team: TeamStrapiPopulated
): { team: Team; users: User[]; members: Member[] } => {
  if (!team.data) return { team: null, users: null, members: null };

  const { members, users } = getMemberListFromStrapiDTO(
    team.data.attributes.members
  );

  return {
    team: {
      id: team.data.id,
      name: team.data.attributes.name,
      members: members.map((member) => member.id),
      project: team.data.attributes.project.data
        ? team.data.attributes.project.data.id
        : null,
    },
    users,
    members,
  };
};

export const getTeamListFromStrapiDTO = (
  teams: TeamListStrapiPopulated
): { teams: Team[]; members: Member[]; users: User[] } => {
  if (!teams.data) return { teams: null, users: null, members: null };

  const usedUserIds = new Set();
  const users: User[] = [];

  const usedMemberIds = new Set();
  const members: Member[] = [];

  teams.data.forEach((team) => {
    const { members: teamMembers, users: teamUsers } =
      getMemberListFromStrapiDTO(team.attributes.members);

    teamUsers.forEach((user) => {
      if (usedUserIds.has(user.id)) return;
      users.push(user);
    });
    teamMembers.forEach((member) => {
      if (usedMemberIds.has(member.id)) return;
      members.push(member);
    });
  });

  return {
    teams: teams.data.map((team) => ({
      id: team.id,
      name: team.attributes.name,
      members: members.map((member) => member.id),
      project: team.attributes.project.data
        ? team.attributes.project.data.id
        : null,
    })),
    users,
    members,
  };
};

export const getTeamWithAdministratorsFromStrapiDTO = (
  team: TeamStrapiPopulatedWithAdministrators
): {
  team: TeamWithAdministrators;
  members: Member[];
  users: User[];
  administrators: User[];
} => {
  const { members, users } = getMemberListFromStrapiDTO(
    team.data.attributes.members
  );
  const administrators = team.data.attributes.administrators.data.map((user) =>
    getUserFromStrapiDTO({ data: user })
  );

  return {
    team: {
      id: team.data.id,
      name: team.data.attributes.name,
      members: members.map((member) => member.id),
      administrators: administrators.map((administrator) => administrator.id),
      project: team.data.attributes.project.data
        ? team.data.attributes.project.data.id
        : null,
    },
    users: users,
    members: members,
    administrators: administrators,
  };
};

export const getRequestFromStrapiDTO = (request: RequestStrapiInner) => {
  return getTeamWithAdministratorsFromStrapiDTO(request.attributes.team);
};

export const getRequestInfoListFromStrapiDTO = (
  requests: RequestInfoListStrapi
): Request[] => {
  return requests.data.map((request) => ({
    id: request.id,
    team: request.attributes.team.data ? request.attributes.team.data.id : null,
    project: request.attributes.project.data
      ? request.attributes.project.data.id
      : null,
  }));
};
