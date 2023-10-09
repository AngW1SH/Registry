import { ProjectCard, staticProjects } from "@/entities/Project";
import { TagList, getTagsByTagIds, staticTags } from "@/entities/Tag";
import { FC } from "react";

interface LinkedProjectsProps {}

const LinkedProjects: FC<LinkedProjectsProps> = () => {
  const projectData = {
    projects: staticProjects,
    tags: staticTags,
  };

  return (
    <div>
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
    </div>
  );
};

export default LinkedProjects;
