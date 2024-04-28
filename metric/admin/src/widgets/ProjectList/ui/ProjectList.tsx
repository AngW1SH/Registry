import { useAppSelector } from "@/app/store";
import ProjectCard from "@/composites/ProjectInList/ui/ProjectCard";
import { DeleteProjectAlt } from "@/features/DeleteProject";
import { FilterProjects } from "@/features/FilterProjects";
import { PencilCircleIcon } from "@/shared/ui/Icons";
import { FC } from "react";
import { Link } from "react-router-dom";

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
      <ul className="flex flex-col gap-6 pr-20">
        {filtered.map((project) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              actions={
                <div className="flex gap-5">
                  <Link
                    to={
                      import.meta.env.VITE_BASE_URL +
                      "project/" +
                      project.id +
                      "/settings"
                    }
                    className="h-10 w-10"
                  >
                    <PencilCircleIcon />
                  </Link>
                  <DeleteProjectAlt
                    className="h-10 w-10"
                    projectId={project.id}
                  />
                </div>
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProjectList;
