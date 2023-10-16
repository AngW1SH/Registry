import { Team } from "@/entities/team";
import {
  TeamMemberStrapiPopulated,
  TeamStrapiPopulated,
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

export const getTeamWithAdministratorsFromStrapiDTO = (
  team: TeamStrapiPopulated
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
