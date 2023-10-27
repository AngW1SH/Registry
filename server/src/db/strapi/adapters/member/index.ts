import { User } from "@/entities/user";
import { MemberListStrapi, MemberStrapi } from "../../types/member";
import { getUserFromStrapiDTO } from "../user";
import { Member } from "@/entities/member";
import { TeamStrapi } from "../../types/team";
import { UserStrapi } from "../../types/user";

export const getMemberFromStrapiDTO = (
  member: MemberStrapi,
  options?: {
    team?: TeamStrapi;
    includeAdmin?: boolean;
  }
): {
  member: Member;
  user: User | null;
  administrator: User | null;
} => {
  const user = member.data.attributes.user?.data?.hasOwnProperty("attributes")
    ? getUserFromStrapiDTO({
        data: (member.data.attributes.user as UserStrapi).data,
      })
    : null;

  const administrator =
    options?.team &&
    user &&
    options?.team?.data?.attributes.administrators?.data.findIndex(
      (admin) => admin.id == user.id
    ) != -1
      ? user
      : null;

  return {
    user,
    administrator,
    member: {
      id: member.data.id,
      role: member.data.attributes.role,
      name: member.data.attributes.name,
      isAdministrator:
        options &&
        options.includeAdmin &&
        options.team &&
        options.team.data?.attributes.administrators?.data
          ? !!options.team.data.attributes.administrators.data.find(
              (admin) => admin.id == member.data.attributes.user?.data?.id
            )
          : null,
      user: user ? user.id : null,
      team: member.data.attributes.team?.data
        ? member.data.attributes.team.data.id
        : null,
    },
  };
};

export const getMemberListFromStrapiDTO = (
  members: MemberListStrapi,
  options?: {
    team?: TeamStrapi;
    includeAdmin?: boolean;
  }
): {
  members: Member[];
  users: User[];
  administrators: User[];
} => {
  const usedUserIds = new Set();
  const users: User[] = [];

  const usedAdministratorIds = new Set();
  const administrators: User[] = [];

  members.data.forEach((member) => {
    if (
      !member.attributes.user?.data?.attributes?.hasOwnProperty("name") ||
      usedUserIds.has(member.attributes.user.data.id)
    )
      return;

    usedUserIds.add(member.attributes.user.data.id);
    users.push(getUserFromStrapiDTO(member.attributes.user as UserStrapi));
  });

  if (options && options.includeAdmin && options.team) {
    options.team.data?.attributes.administrators?.data.forEach(
      (administrator) => {
        if (
          !administrator?.attributes?.hasOwnProperty("name") ||
          usedAdministratorIds.has(administrator.id)
        )
          return;

        usedAdministratorIds.add(administrator.id);
        administrators.push(
          getUserFromStrapiDTO({ data: administrator } as UserStrapi)
        );
      }
    );
  }

  return {
    users,
    members: members.data.map((member) => {
      return {
        id: member.id,
        role: member.attributes.role,
        name: member.attributes.name,
        isAdministrator:
          (options?.includeAdmin &&
            !!options?.team?.data?.attributes.administrators?.data.find(
              (admin) => admin.id == member.attributes.user?.data?.id
            )) ||
          false,
        user: member.attributes.user?.data?.id || null,
        team: member.attributes.team?.data?.id || null,
      };
    }),
    administrators: options?.team ? administrators : [],
  };
};
