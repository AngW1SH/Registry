import { IMember, getMembersByMemberIds } from "@/entities/Member";
import { ITeamExtended } from "@/entities/Team";
import { IUser } from "@/entities/User";
import { ReactNode } from "react";
import EditMember from "../ui/EditMember";

export const generateEditUIByTeam = (
  user: IUser,
  teamMembers: IMember[],
  users: IUser[],
): (ReactNode | null)[] => {
  const teamAdmins = teamMembers.filter((member) => member.isAdministrator);

  const isUserAnAdmin = teamAdmins.map((admin) => admin.user).includes(user.id);

  return teamMembers.map((member) => {
    const memberUser = users.find((user) => user.id == member.user);

    if (!memberUser) return null;

    if (isUserAnAdmin) return <EditMember member={member} user={memberUser} />;

    return member.user && member.user == user.id ? (
      <EditMember member={member} user={memberUser} />
    ) : null;
  });
};
