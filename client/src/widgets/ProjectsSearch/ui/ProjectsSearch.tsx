import { IProject, staticProjects } from "@/entities/Project";
import { ITag, staticTags } from "@/entities/Tag";
import {
  SearchWithProjectList,
  fetchProjects,
} from "@/features/SearchWithProjectList";
import { SearchWithRedirect } from "@/features/SearchWithRedirect";
import { FC } from "react";

interface ProjectsSearchProps {
  data?: {
    projects: IProject[];
    tags: ITag[];
  };
}

const ProjectsSearch: FC<ProjectsSearchProps> = async ({ data }) => {
  const { projects, tags } = data ? data : await fetchProjects();

  return (
    <SearchWithProjectList
      initialData={{
        projects: projects,
        tags: tags,
      }}
    />
  );
};

export default ProjectsSearch;
