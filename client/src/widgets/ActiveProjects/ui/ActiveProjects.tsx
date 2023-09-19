import { IProject, ProjectCard } from "@/entities/Project";
import { ITag, TagList } from "@/entities/Tag";
import {
  GetActiveProjectsByTags,
  fetchActiveProjectsData,
} from "@/features/GetActiveProjectsByTags";
import { LinkWithIcon } from "@/shared/ui";
import { FC } from "react";

interface ActiveProjectsProps {
  data?: {
    projects: IProject[];
    tags: ITag[];
  };
}

const ActiveProjects: FC<ActiveProjectsProps> = async ({ data }) => {
  data = data ? data : await fetchActiveProjectsData();

  const { tags, projects } = data;

  return (
    <div>
      <GetActiveProjectsByTags tags={tags} projects={projects} />
      <div className="pt-7" />
      <LinkWithIcon href="/">Показать ещё</LinkWithIcon>
    </div>
  );
};

export default ActiveProjects;
