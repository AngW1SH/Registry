import { ITeam } from "@/entities/Team";
import { IUserWithRole } from "@/entities/User";
import LabeledBlock from "@/shared/ui/LabeledBlock/LabeledBlock";
import { FC } from "react";
import ProjectTeam from "./ProjectTeam";

interface ProjectTeamListProps {
  teams: ITeam[];
  users: IUserWithRole[];
}

const ProjectTeamList: FC<ProjectTeamListProps> = ({ teams, users }) => {
  return (
    <LabeledBlock label={"Состав команд" + (teams.length > 1 ? "" : "ы")}>
      <ul className="flex w-full flex-col gap-16">
        {teams.map((team) => (
          <li>
            <ProjectTeam team={team} users={users} />
          </li>
        ))}
      </ul>
    </LabeledBlock>
  );
};

export default ProjectTeamList;
