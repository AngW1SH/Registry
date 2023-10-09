import { FC } from "react";
import { IProjectsWithTags } from "../types/types";
import { ProjectCard } from "@/entities/Project";
import { TagList, getTagsByTagIds } from "@/entities/Tag";

interface ProjectsWithTagsListProps {
  projectData: IProjectsWithTags;
}

const ProjectsWithTagsList: FC<ProjectsWithTagsListProps> = ({
  projectData,
}) => {
  return (
    <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {projectData.projects.map((project) => (
        <li key={project.id}>
          <ProjectCard
            className="h-full"
            project={project}
            tags={
              <TagList
                tags={getTagsByTagIds(project.tags, projectData.tags)}
                className="justify-end"
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ProjectsWithTagsList;
