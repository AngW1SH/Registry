import { useAppSelector } from "@/app/store";
import ProjectCard from "@/composites/ProjectInList/ui/ProjectCard";
import { DeleteProject } from "@/features/Project";
import {
  ChooseProjectListSortType,
  FilterProjectList,
  ProjectSortType,
} from "@/features/ProjectList";
import { PencilCircleIcon } from "@/shared/ui/Icons";
import { FC, useState } from "react";
import { shallowEqual } from "react-redux";
import { Link } from "react-router-dom";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  const [sortType, setSortType] = useState<ProjectSortType>(
    ProjectSortType.name
  );

  const { projects, filters } = useAppSelector(
    (state) => state.projectList,
    shallowEqual
  );

  const filtered = projects.filter((project) => {
    if (!filters.text) return true;

    if (project.name.toLowerCase().includes(filters.text.toLowerCase()))
      return true;
    if (project.description.toLowerCase().includes(filters.text.toLowerCase()))
      return true;

    return false;
  });

  const sorted = filtered.sort((a, b) => {
    switch (sortType) {
      case ProjectSortType.name:
        return a.name.localeCompare(b.name);
      case ProjectSortType.grade:
        if (a.grade === "N/A") return 1;
        if (b.grade === "N/A") return -1;
        return +b.grade - +a.grade;
    }
  });

  if (!projects) return <ul></ul>;

  return (
    <>
      <div className="flex gap-x-5">
        <FilterProjectList />
        <ChooseProjectListSortType
          selected={sortType}
          setSelected={setSortType}
        />
      </div>
      <div className="pt-7" />
      <ul className="flex flex-col gap-6">
        {sorted.map((project) => (
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
                  <DeleteProject
                    style="icon"
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
