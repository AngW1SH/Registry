import { ITeam } from "@/entities/Team";
import { IUser } from "@/entities/User";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";
import ProjectTeam from "./ProjectTeam";
import { IMember } from "@/entities/Member";

interface ProjectTeamListProps {
  teams: ITeam[];
  users: IUser[];
  members: IMember[];
}

const ProjectTeamList: FC<ProjectTeamListProps> = ({
  teams,
  users,
  members,
}) => {
  return (
    <LabeledBlock label={"Состав команд" + (teams.length > 1 ? "" : "ы")}>
      <ul className="flex w-full flex-col gap-16">
        {teams.map((team) => (
          <li key={team.id}>
            <ProjectTeam team={team} members={members} users={users} />
          </li>
        ))}
      </ul>
    </LabeledBlock>
  );
};

export default ProjectTeamList;
