import { useAppSelector } from "@/app/store";
import { ProjectCard } from "@/entities/Project";
import { FC } from "react";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  const { projects } = useAppSelector((state) => state.projectList);

  if (!projects) return <ul></ul>;

  return (
    <ul className="grid gap-6 grid-cols-3 auto-rows-auto">
      {projects.map((project) => (
        <li>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
