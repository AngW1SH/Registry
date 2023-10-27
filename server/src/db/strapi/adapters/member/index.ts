import { User } from "@/entities/user";
import {
  MemberWithUserListStrapi,
  MemberWithUserStrapi,
} from "../../types/member";
import { getUserFromStrapiDTO } from "../user";
import { Member } from "@/entities/member";
import {
  TeamStrapiPopulated,
  TeamStrapiPopulatedWithAdministrators,
} from "../../types/team";

export const getMemberFromStrapiDTO = (
  member: MemberWithUserStrapi,
  team?: TeamStrapiPopulatedWithAdministrators
): {
  member: Member;
  user: User;
} => {
  const user = getUserFromStrapiDTO({ data: member.data.attributes.user.data });

  return {
    user,
    member: {
      id: member.data.id,
      role: member.data.attributes.role,
      name: member.data.attributes.name,
      isAdministrator:
        team && team.data.attributes.administrators.data
          ? !!team.data.attributes.administrators.data.find(
              (admin) => admin.id == member.data.attributes.user.data.id
            )
          : null,
      user: user.id,
      team: member.data.attributes.team.data
        ? member.data.attributes.team.data.id
        : null,
    },
  };
};

export const getMemberListFromStrapiDTO = (
  members: MemberWithUserListStrapi,
  team?: TeamStrapiPopulatedWithAdministrators
): {
  members: Member[];
  users: User[];
  administrators: User[];
} => {
  const usedUserIds = new Set();
  const users: User[] = [];
  const administrators: User[] = [];

  members.data.forEach((member) => {
    if (usedUserIds.has(member.attributes.user.data.id)) return;

    usedUserIds.add(member.attributes.user.data.id);
    users.push(getUserFromStrapiDTO(member.attributes.user));
  });

  if (team) {
    team.data.attributes.administrators.data.forEach((administrator) => {
      if (usedUserIds.has(administrator.id)) return;

      usedUserIds.add(administrator.id);
      users.push(getUserFromStrapiDTO({ data: administrator }));
    });
  }

  return {
    users,
    members: members.data.map((member) => ({
      id: member.id,
      role: member.attributes.role,
      name: member.attributes.name,
      isAdministrator:
        team && team.data.attributes.administrators.data
          ? !!team.data.attributes.administrators.data.find(
              (admin) => admin.id == member.attributes.user.data.id
            )
          : null,
      user: member.attributes.user.data.id,
      team: member.attributes.team.data.id,
    })),
    administrators: team ? administrators : [],
  };
};
