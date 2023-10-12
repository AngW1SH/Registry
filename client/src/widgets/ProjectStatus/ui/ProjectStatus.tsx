import { Button } from "@/shared/ui";
import { FC } from "react";
import StatusHiringUnauthorized from "./StatusHiringUnauthorized";
import StatusActive from "./StatusActive";
import StatusHiringAuthorized from "./StatusHiringAuthorized";
import StatusHiringAuthorizedAlt from "./StatusHiringAuthorizedAlt";
import StatusHiringTeamlead from "./StatusHiringTeamlead";
import { IUserWithRole } from "@/entities/User";

interface ProjectStatusProps {
  className?: string;
  users: IUserWithRole[];
}

const ProjectStatus: FC<ProjectStatusProps> = ({ className = "", users }) => {
  return (
    <div
      className={
        "rounded-xl bg-white px-10 py-6 shadow-center-lg lg:h-[420px] lg:py-12 xl:px-16 xl:py-14 " +
        className
      }
    >
      <div className="flex h-full flex-col items-start">
        <StatusActive users={users} />
      </div>
    </div>
  );
};

export default ProjectStatus;
