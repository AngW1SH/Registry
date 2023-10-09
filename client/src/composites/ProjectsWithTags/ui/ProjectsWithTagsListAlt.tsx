import { FC } from "react";
import { IProjectsWithTags } from "../types/types";
import { ProjectCardAlt } from "@/entities/Project";
import { TagList, getTagsByTagIds } from "@/entities/Tag";

interface ProjectsWithTagsListAltProps {
  projectData: IProjectsWithTags;
}

const ProjectsWithTagsListAlt: FC<ProjectsWithTagsListAltProps> = ({
  projectData,
}) => {
  return (
    <ul className="grid auto-rows-fr grid-cols-1 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 sm:[&>li:nth-child(2n)]:border-r-0 lg:[&>li:nth-child(2n)]:border-r lg:[&>li:nth-child(3n)]:border-r-0 [&>li]:border-x-0  sm:[&>li]:border-r">
      {projectData.projects.map((project) => (
        <li
          key={project.id}
          className="col-span-1 row-span-1 border-t border-black p-3"
        >
          <ProjectCardAlt
            project={project}
            tags={
              <TagList tags={getTagsByTagIds(project.tags, projectData.tags)} />
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ProjectsWithTagsListAlt;
