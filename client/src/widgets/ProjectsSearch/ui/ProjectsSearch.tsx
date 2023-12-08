import { IProject } from "@/entities/Project";
import { getFiltersByParams } from "@/entities/ProjectFilters";
import { initialFilters } from "@/entities/ProjectFilters/config/initialFilters";
import { ITag } from "@/entities/Tag";
import {
  SearchWithProjectList,
  fetchProjects,
} from "@/features/SearchWithProjectList";
import { FC } from "react";

interface ProjectsSearchProps {
  data?: {
    projects: IProject[];
    tags: ITag[];
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const ProjectsSearch: FC<ProjectsSearchProps> = async ({
  data,
  searchParams,
}) => {
  const filters = searchParams
    ? getFiltersByParams(searchParams)
    : initialFilters;

  const endData = data ? data : await fetchProjects(filters);

  return (
    <>
      {endData && (
        <SearchWithProjectList
          initialData={{
            projects: endData.projects,
            tags: endData.tags,
          }}
          searchParams={searchParams}
        />
      )}
    </>
  );
};

export default ProjectsSearch;
