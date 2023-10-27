import { Team } from "@/entities/team";
import {
  TeamListStrapi,
  TeamListStrapiPopulated,
  TeamListStrapiPopulatedWithAdministrators,
  TeamStrapi,
  TeamStrapiPopulated,
  TeamStrapiPopulatedWithAdministrators,
} from "../../types/team";
import type { User } from "@/entities/user";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import {
  RequestInfoListStrapi,
  RequestStrapi,
  RequestStrapiInner,
} from "../../types/request";
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
  team: Team | null;
  users: User[] | null;
  members: Member[] | null;
  administrators: User[] | null;
} => {
  if (!team.data)
    return { team: null, users: null, members: null, administrators: null };

  const { members, users, administrators } =
    team.data.attributes.members.hasOwnProperty("attributes")
      ? getMemberListFromStrapiDTO(
          team.data.attributes.members as MemberListStrapi,
          {
            team,
            includeAdmin: options.includeAdmin,
          }
        )
      : { members: [], users: [], administrators: [] };

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
    administrators,
  };
};

export const getTeamListFromStrapiDTO = (
  teams: TeamListStrapi,
  options?: {
    includeAdmin?: boolean;
  }
): {
  teams: Team[] | null;
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
    } = team.attributes.members.data.hasOwnProperty("attributes")
      ? getMemberListFromStrapiDTO(
          team.attributes.members as MemberListStrapi,
          { includeAdmin: options.includeAdmin, team: { data: team } }
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
      project: team.attributes.project.data
        ? team.attributes.project.data.id
        : null,
    })),
    users,
    members,
    administrators,
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
    team.data.attributes.members,
    {
      team,
    }
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

export const getTeamListWithAdministratorsFromStrapiDTO = (
  teams: TeamListStrapiPopulatedWithAdministrators
): {
  teams: TeamWithAdministrators[];
  members: Member[];
  users: User[];
  administrators: User[];
} => {
  if (!teams.data)
    return { teams: null, users: null, members: null, administrators: null };

  const usedUserIds = new Set();
  const users: User[] = [];

  const usedMemberIds = new Set();
  const members: Member[] = [];

  const usedAdministratorIds = new Set();
  const administrators: User[] = [];

  teams.data.forEach((team) => {
    const {
      members: teamMembers,
      users: teamUsers,
      administrators: teamAdministrators,
    } = getMemberListFromStrapiDTO(team.attributes.members, {
      team: { data: team },
    });

    teamUsers.forEach((user) => {
      if (usedUserIds.has(user.id)) return;
      users.push(user);
    });
    teamMembers.forEach((member) => {
      if (usedMemberIds.has(member.id)) return;
      members.push(member);
    });
    teamAdministrators.forEach((administrator) => {
      if (usedAdministratorIds.has(administrator.id)) return;
      administrators.push(administrator);
    });
  });

  return {
    teams: teams.data.map((team) => ({
      id: team.id,
      name: team.attributes.name,
      members: members.map((member) => member.id),
      administrators: administrators.map((administrator) => administrator.id),
      project: team.attributes.project.data
        ? team.attributes.project.data.id
        : null,
    })),
    users,
    members,
    administrators,
  };
};

export const getRequestFromStrapiDTO = (request: RequestStrapi) => {
  return getTeamFromStrapiDTO(request.data.attributes.team);
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
