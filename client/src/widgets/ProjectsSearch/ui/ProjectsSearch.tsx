import { staticProjects } from "@/entities/Project";
import { staticTags } from "@/entities/Tag";
import {
  SearchWithProjectList,
  fetchProjects,
} from "@/features/SearchWithProjectList";
import { SearchWithRedirect } from "@/features/SearchWithRedirect";
import { FC } from "react";

interface ProjectsSearchProps {}

const ProjectsSearch: FC<ProjectsSearchProps> = async () => {
  const { projects, tags } = await fetchProjects();

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
