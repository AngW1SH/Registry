import { IProject, ProjectCardAlt } from "@/entities/Project";
import { ITag, TagList, getTagsByTagIds } from "@/entities/Tag";
import { LinkWithIcon } from "@/shared/ui";
import { FC } from "react";
import { fetchNewProjects } from "../api/fetchNewProjects";
import { IProjectsWithTags } from "@/composites/ProjectsWithTags/types/types";
import { ProjectsWithTagsListAlt } from "@/composites/ProjectsWithTags";

interface NewProjectsProps {
  data?: IProjectsWithTags;
}

const NewProjects: FC<NewProjectsProps> = async ({ data }) => {
  const projectData = data ? data : await fetchNewProjects();
  return (
    <>
      {projectData && <ProjectsWithTagsListAlt projectData={projectData} />}
      <div className="pt-6" />
      <LinkWithIcon href="/projects" className="font-medium" iconSize={10}>
        Показать ещё
      </LinkWithIcon>
    </>
  );
};

export default NewProjects;
