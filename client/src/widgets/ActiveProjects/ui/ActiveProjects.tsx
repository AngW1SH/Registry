import { IProject, ProjectCard } from "@/entities/Project";
import { ITag, TagList } from "@/entities/Tag";
import { GetActiveProjectsByTags } from "@/features/GetActiveProjectsByTags";
import { LinkWithIcon } from "@/shared/ui";
import { FC } from "react";
import { fetchTags } from "../api/fetchTags";
import { fetchActiveProjects } from "../api/fetchActiveProjects";

interface ActiveProjectsProps {
  tags?: ITag[];
  projects?: IProject[];
}

const ActiveProjects: FC<ActiveProjectsProps> = async ({ tags, projects }) => {
  const tagsRequest = tags ? tags : fetchTags();
  const projectsRequest = projects ? projects : fetchActiveProjects();

  [tags, projects] = await Promise.all([tagsRequest, projectsRequest]);

  return (
    <div>
      <GetActiveProjectsByTags tags={tags} projects={projects} />
      <div className="pt-7" />
      <LinkWithIcon href="/">Показать ещё</LinkWithIcon>
    </div>
  );
};

export default ActiveProjects;
