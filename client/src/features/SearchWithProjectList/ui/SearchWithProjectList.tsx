"use client";
import { FC, useState } from "react";
import {
  DetailedProjectFilters,
  ProjectFilters,
} from "@/entities/ProjectFilters";
import ProjectCardLarge from "@/entities/Project/ui/ProjectCardLarge";
import { IProject } from "@/entities/Project";
import { ITag, TagList, getTagsByTagIds } from "@/entities/Tag";

interface SearchWithProjectListProps {
  initialData: {
    projects: IProject[];
    tags: ITag[];
  };
}

const SearchWithProjectList: FC<SearchWithProjectListProps> = ({
  initialData,
}) => {
  const [projectData, setProjectData] = useState(initialData);

  return (
    <>
      <div className="relative z-10 rounded-2xl bg-[#e0efef] px-8 py-6 backdrop-blur-[12px] sm:pb-14 sm:pt-12">
        <ProjectFilters />
      </div>
      <div className="pt-10" />
      <DetailedProjectFilters />
      <div className="border-b border-black pt-5" />
      {projectData.projects.map((project) => (
        <li
          className="list-none border-b border-black pb-3 pt-2"
          key={project.id}
        >
          <ProjectCardLarge
            className="h-full"
            project={project}
            tags={
              <TagList
                tags={getTagsByTagIds(project.tags, projectData.tags)}
                className="pl-[96px]"
              />
            }
          />
        </li>
      ))}
    </>
  );
};

export default SearchWithProjectList;
