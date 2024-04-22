import { FC } from "react";
import { Link } from "react-router-dom";
import { IProject } from "..";

interface ProjectCardProps {
  project: IProject;
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className = "" }) => {
  return (
    <Link to={import.meta.env.VITE_BASE_URL + "project/" + project.id}>
      <div
        className={
          "pt-8 flex flex-col pb-10 pl-7 pr-10 bg-background rounded-lg " +
          className
        }
      >
        <h2 className="font-medium text-2xl">{project.name}</h2>
        <p className="mt-3 text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
          accusantium facilis maxime odio minima quisquam quo animi dolorem hic
          dolore.
        </p>
      </div>
    </Link>
  );
};

export default ProjectCard;
