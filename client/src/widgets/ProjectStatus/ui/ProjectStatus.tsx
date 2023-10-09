import { Button } from "@/shared/ui";
import { FC } from "react";
import StatusHiringUnauthorized from "./StatusHiringUnauthorized";
import StatusActive from "./StatusActive";
import StatusHiringAuthorized from "./StatusHiringAuthorized";
import StatusHiringAuthorizedAlt from "./StatusHiringAuthorizedAlt";
import StatusHiringTeamlead from "./StatusHiringTeamlead";

interface ProjectStatusProps {
  className?: string;
}

const ProjectStatus: FC<ProjectStatusProps> = ({ className = "" }) => {
  return (
    <div
      className={
        "h-[420px] rounded-xl bg-white px-16 py-14 shadow-center-lg " +
        className
      }
    >
      <div className="flex h-full flex-col items-start">
        <StatusHiringTeamlead />
      </div>
    </div>
  );
};

export default ProjectStatus;
