import {
  RequestStrapi,
  RequestStrapiInner,
  Team,
  TeamMemberStrapiPopulated,
  TeamStrapiPopulated,
  TeamStrapiPopulatedInner,
  TeamWithAdministrators,
} from "../types/types";
import type { User, UserWithRole } from "@/entities/user";
import { flattenUser } from "@/entities/user";

const flattenTeamMember = (member: TeamMemberStrapiPopulated): UserWithRole => {
  return {
    ...flattenUser(member.attributes.user.data),
    role: member.attributes.role,
  };
};

export const flattenTeam = (
  team: TeamStrapiPopulated
): { team: Team; users: UserWithRole[] } => {
  if (!team.data) return { team: null, users: null };

  const users = team.data.attributes.members.data.map((member) =>
    flattenTeamMember(member)
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

export const flattenTeamWithAdministrators = (
  team: TeamStrapiPopulated
): {
  team: TeamWithAdministrators;
  users: UserWithRole[];
  administrators: User[];
} => {
  const users = team.data.attributes.members.data.map((member) =>
    flattenTeamMember(member)
  );
  const administrators = team.data.attributes.administrators.data.map(
    (member) => flattenUser(member)
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

export const flattenRequest = (request: RequestStrapiInner) => {
  return flattenTeamWithAdministrators(request.attributes.team);
};
