import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { ProjectInList } from "../types";
import { PlatformIcon } from "@/entities/Platform";

interface ProjectCardProps {
  project: ProjectInList;
  actions?: ReactElement;
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  project,
  className = "",
  actions,
}) => {
  return (
    <div
      className={
        "pt-8 w-full h-full flex items-center pb-10 pl-7 pr-10 bg-background rounded-lg " +
        className
      }
    >
      <ul className="flex gap-5 min-w-max">
        {project.platforms.map((platform) => (
          <li
            key={platform}
            className="w-16 h-16 p-2 border border-[#dedede] rounded-xl bg-background flex items-center justify-center"
          >
            <PlatformIcon name={platform} />
          </li>
        ))}
      </ul>
      <div className="ml-5">
        <Link to={import.meta.env.VITE_BASE_URL + "project/" + project.id}>
          <h2
            className="max-w-[700px] whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold text-2xl"
            title={project.name}
          >
            {project.name}
          </h2>
          <p
            className="max-w-[700px] whitespace-nowrap overflow-hidden overflow-ellipsis mt-3 text-base"
            title={project.description}
          >
            {project.description}
          </p>
        </Link>
      </div>
      <div className="ml-auto">{actions}</div>
    </div>
  );
};

export default ProjectCard;
