import {
  Team,
  TeamMemberStrapiPopulated,
  TeamStrapiPopulated,
} from "@/entities/team/types/types";
import { User } from "@/entities/user/types/types";
import { flattenUser } from "@/helpers/user";

const flattenTeamMember = (member: TeamMemberStrapiPopulated): User => {
  return flattenUser(member.attributes.user);
};

export const flattenTeam = (
  team: TeamStrapiPopulated
): { team: Team; users: User[] } => {
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
