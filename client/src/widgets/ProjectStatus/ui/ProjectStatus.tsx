import { FC } from "react";
import { IUserWithRole } from "@/entities/User";
import StatusBuilder from "./StatusBuilder";
import { IProject } from "@/entities/Project";

interface ProjectStatusProps {
  project: IProject;
  users: IUserWithRole[] | null;
  className?: string;
}

const ProjectStatus: FC<ProjectStatusProps> = ({
  project,
  users,
  className = "",
}) => {
  return (
    <div
      className={
        "rounded-xl bg-white px-10 py-6 shadow-center-lg lg:h-[420px] lg:py-12 xl:px-16 xl:py-14 " +
        className
      }
    >
      <div className="flex h-full flex-col items-start">
        <StatusBuilder users={users} project={project} />
      </div>
    </div>
  );
};

export default ProjectStatus;
