import { FC } from "react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ className = "" }) => {
  return (
    <Link to="/project">
      <div
        className={
          "pt-8 flex flex-col pb-10 pl-7 pr-10 bg-background rounded-lg " +
          className
        }
      >
        <h2 className="font-medium text-2xl">
          Реестр проектов клинической практики СПбГУ
        </h2>
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
