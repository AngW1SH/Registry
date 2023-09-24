import { SearchWithProjectList } from "@/features/SearchWithProjectList";
import { SearchWithRedirect } from "@/features/SearchWithRedirect";
import { FC } from "react";

interface ProjectsSearchProps {}

const ProjectsSearch: FC<ProjectsSearchProps> = () => {
  return <SearchWithProjectList />;
};

export default ProjectsSearch;
