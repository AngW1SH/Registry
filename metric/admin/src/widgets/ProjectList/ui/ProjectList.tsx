import { useAppSelector } from "@/app/store";
import { ProjectCard } from "@/entities/Project";
import { FilterProjects } from "@/features/FilterProjects";
import { FC } from "react";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  const { projects, filters } = useAppSelector((state) => state.projectList);

  const filtered = projects.filter((project) => {
    if (!filters.text) return true;

    if (project.name.toLowerCase().includes(filters.text.toLowerCase()))
      return true;
    if (project.description.toLowerCase().includes(filters.text.toLowerCase()))
      return true;

    return false;
  });

  if (!projects) return <ul></ul>;

  return (
    <>
      <FilterProjects />
      <div className="pt-7" />
      <ul className="grid gap-6 grid-cols-3 auto-rows-auto">
        {filtered.map((project) => (
          <li>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectList;
