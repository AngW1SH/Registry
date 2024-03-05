import { ProjectCard } from "@/entities/Project";
import { FC } from "react";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  return (
    <ul className="grid gap-6 grid-cols-3 auto-rows-auto">
      <li>
        <ProjectCard />
      </li>
      <li>
        <ProjectCard />
      </li>
    </ul>
  );
};

export default ProjectList;
