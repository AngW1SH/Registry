import { ITeam } from "@/entities/Team";
import {
  IUser,
  IUserWithRole,
  getUsersByUserIds,
  getUsersWithRolesByUserIds,
} from "@/entities/User";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";

interface ProjectTeamProps {
  team: ITeam;
  users: IUserWithRole[];
}

const ProjectTeam: FC<ProjectTeamProps> = ({ team, users }) => {
  const usersPopulated = getUsersWithRolesByUserIds(team.users, users);

  return (
    <LabeledBlock label="Состав команды">
      <ul>
        {usersPopulated.map((user) => (
          <li className="flex border-b border-[#b7b7b7] bg-white py-4 first:border-t">
            <p className="w-1/2">{user.role}</p>
            <p className="text-lg font-medium">{user.name}</p>
          </li>
        ))}
      </ul>
    </LabeledBlock>
  );
};

export default ProjectTeam;
