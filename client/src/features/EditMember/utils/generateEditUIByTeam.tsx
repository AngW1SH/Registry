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

  return teamMembers.map((teamMember) => {
    if (isUserAnAdmin) return <EditMember />;

    return teamMember.user && teamMember.user == user.id ? (
      <EditMember />
    ) : null;
  });
};
