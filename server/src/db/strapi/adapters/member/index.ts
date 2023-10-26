import { User } from "@/entities/user";
import {
  MemberWithUserListStrapi,
  MemberWithUserStrapi,
} from "../../types/member";
import { getUserFromStrapiDTO } from "../user";
import { Member } from "@/entities/member";

export const getMemberFromStrapiDTO = (
  member: MemberWithUserStrapi
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
      user: user.id,
      team: member.data.attributes.team.data
        ? member.data.attributes.team.data.id
        : null,
    },
  };
};

export const getMemberListFromStrapiDTO = (
  members: MemberWithUserListStrapi
): {
  members: Member[];
  users: User[];
} => {
  const usedUserIds = new Set();
  const users: User[] = [];

  members.data.forEach((member) => {
    if (usedUserIds.has(member.attributes.user.data.id)) return;

    usedUserIds.add(member.attributes.user.data.id);
    users.push(getUserFromStrapiDTO(member.attributes.user));
  });

  return {
    users,
    members: members.data.map((member) => ({
      id: member.id,
      role: member.attributes.role,
      name: member.attributes.name,
      user: member.attributes.user.data.id,
      team: member.attributes.team.data.id,
    })),
  };
};
