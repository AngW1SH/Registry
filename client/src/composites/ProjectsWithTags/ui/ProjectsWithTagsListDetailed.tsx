import { FC } from "react";
import { IProjectsWithTags } from "../types/types";
import { TagList, getTagsByTagIds } from "@/entities/Tag";
import ProjectCardLarge from "@/entities/Project/ui/ProjectCardLarge";

interface ProjectsWithTagsListLargeProps {
  projectData: IProjectsWithTags;
}

const ProjectsWithTagsListLarge: FC<ProjectsWithTagsListLargeProps> = ({
  projectData,
}) => {
  return projectData.projects.map((project) => (
    <li className="list-none border-b border-black pb-3 pt-2" key={project.id}>
      <ProjectCardLarge
        className="h-full"
        project={project}
        tags={
          <TagList tags={getTagsByTagIds(project.tags, projectData.tags)} />
        }
      />
    </li>
  ));
};

export default ProjectsWithTagsListLarge;
