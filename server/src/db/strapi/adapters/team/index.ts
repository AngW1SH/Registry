import { Team } from "@/entities/team";
import {
  TeamListStrapiPopulated,
  TeamMemberStrapiPopulated,
  TeamStrapiPopulated,
  TeamStrapiPopulatedWithAdministrators,
} from "../../types/team";
import type { User, UserWithRole } from "@/entities/user";
import { TeamWithAdministrators } from "@/entities/team/types/types";
import { RequestStrapiInner } from "../../types/request";
import { getUserFromStrapiDTO } from "../user";

const getTeamMemberFromStrapiDTO = (
  member: TeamMemberStrapiPopulated
): UserWithRole => {
  return {
    ...getUserFromStrapiDTO({ data: member.attributes.user.data }),
    role: member.attributes.role,
  };
};

export const getTeamFromStrapiDTO = (
  team: TeamStrapiPopulated
): { team: Team; users: UserWithRole[] } => {
  if (!team.data) return { team: null, users: null };

  const users = team.data.attributes.members.data.map((member) =>
    getTeamMemberFromStrapiDTO(member)
  );

  return {
    team: {
      id: team.data.id,
      name: team.data.attributes.name,
      users: users.map((user) => user.id),
    },
    users: users,
  };
};

export const getTeamListFromStrapiDTO = (
  teams: TeamListStrapiPopulated
): { teams: Team[]; users: UserWithRole[] } => {
  if (!teams.data) return { teams: null, users: null };

  const usedUserIds = new Set();
  const users: UserWithRole[] = [];

  teams.data.forEach((team) => {
    team.attributes.members.data.forEach((member) => {
      if (usedUserIds.has(member.attributes.user.data.id)) return;

      usedUserIds.add(member.attributes.user.data.id);
      users.push(getTeamMemberFromStrapiDTO(member));
    });
  });

  return {
    teams: teams.data.map((team) => ({
      id: team.id,
      name: team.attributes.name,
      users: team.attributes.members.data.map(
        (member) => member.attributes.user.data.id
      ),
    })),
    users,
  };
};

export const getTeamWithAdministratorsFromStrapiDTO = (
  team: TeamStrapiPopulatedWithAdministrators
): {
  team: TeamWithAdministrators;
  users: UserWithRole[];
  administrators: User[];
} => {
  const users = team.data.attributes.members.data.map((member) =>
    getTeamMemberFromStrapiDTO(member)
  );
  const administrators = team.data.attributes.administrators.data.map((user) =>
    getUserFromStrapiDTO({ data: user })
  );

  return {
    team: {
      id: team.data.id,
      name: team.data.attributes.name,
      users: users.map((user) => user.id),
      administrators: administrators.map((administrator) => administrator.id),
    },
    users: users,
    administrators: administrators,
  };
};

export const getRequestFromStrapiDTO = (request: RequestStrapiInner) => {
  return getTeamWithAdministratorsFromStrapiDTO(request.attributes.team);
};
