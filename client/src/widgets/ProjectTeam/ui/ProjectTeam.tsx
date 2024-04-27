import { IMember, getMembersByMemberIds } from "@/entities/Member";
import { ITeam } from "@/entities/Team";
import { IUser, getUsersByUserIds } from "@/entities/User";
import { FC } from "react";

interface ProjectTeamProps {
  team: ITeam;
  users: IUser[];
  members: IMember[];
}

const ProjectTeam: FC<ProjectTeamProps> = ({ team, users, members }) => {
  // Get member data for each member in team
  const membersPopulated = getMembersByMemberIds(team.members, members);

  // Get corresponding user for each member
  const displayData = membersPopulated.map((member) => ({
    member,
    user: users.find((userMapped) => userMapped.id == member.user)!,
  }));

  return (
    <ul>
      {displayData.map(({ member, user }) => (
        <li
          key={user.name}
          className="flex border-b border-[#b7b7b7] bg-white py-4 first:border-t"
        >
          <p className="w-1/2 text-lg font-medium">{user.name}</p>
          <p className="w-1/2">{member.roles.join(", ")}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProjectTeam;
