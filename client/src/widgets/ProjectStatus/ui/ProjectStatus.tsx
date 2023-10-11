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
        "h-[420px] rounded-xl bg-white px-10 py-12 shadow-center-lg xl:px-16 xl:py-14 " +
        className
      }
    >
      <div className="flex h-full flex-col items-start">
        <StatusHiringUnauthorized />
      </div>
    </div>
  );
};

export default ProjectStatus;
