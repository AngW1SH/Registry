import { IProject, ProjectCard, staticProjects } from "@/entities/Project";
import { ITag, TagList, getTagsByTagIds, staticTags } from "@/entities/Tag";
import { FC } from "react";

interface LinkedProjectsProps {
  projects: IProject[];
  tags: ITag[];
}

const LinkedProjects: FC<LinkedProjectsProps> = ({ projects, tags }) => {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard
              className="h-full"
              project={project as any}
              tags={
                <TagList
                  tags={getTagsByTagIds(project.tags, tags)}
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
