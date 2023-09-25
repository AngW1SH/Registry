import { staticProjects } from "@/entities/Project";
import { staticTags } from "@/entities/Tag";
import { SearchWithProjectList } from "@/features/SearchWithProjectList";
import { SearchWithRedirect } from "@/features/SearchWithRedirect";
import { FC } from "react";

interface ProjectsSearchProps {}

const ProjectsSearch: FC<ProjectsSearchProps> = () => {
  return (
    <SearchWithProjectList
      initialData={{
        projects: staticProjects,
        tags: staticTags,
      }}
    />
  );
};

export default ProjectsSearch;
