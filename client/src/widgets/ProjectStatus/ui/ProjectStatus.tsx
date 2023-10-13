import { Button } from "@/shared/ui";
import { FC } from "react";
import StatusHiringUnauthorized from "./StatusHiringUnauthorized";
import StatusActive from "./StatusActive";
import StatusHiringAuthorized from "./StatusHiringAuthorized";
import StatusHiringAuthorizedAlt from "./StatusHiringAuthorizedAlt";
import StatusHiringTeamlead from "./StatusHiringTeamlead";
import { IUserWithRole } from "@/entities/User";
import StatusBuilder from "./StatusBuilder";
import { IProject, getProjectStage } from "@/entities/Project";

interface ProjectStatusProps {
  project: IProject;
  users: IUserWithRole[];
  className?: string;
}

const ProjectStatus: FC<ProjectStatusProps> = ({
  project,
  users,
  className = "",
}) => {
  const stage = getProjectStage(project);

  return (
    <div
      className={
        "rounded-xl bg-white px-10 py-6 shadow-center-lg lg:h-[420px] lg:py-12 xl:px-16 xl:py-14 " +
        className
      }
    >
      <div className="flex h-full flex-col items-start">
        <StatusBuilder users={users} stage={stage} />
      </div>
    </div>
  );
};

export default ProjectStatus;
