import { ProjectFilters } from "@/entities/project";
import { ProjectDTO } from "@/entities/project/types/types";

const statusPostFilters = (
  status: string,
  projects: ProjectDTO[]
): ProjectDTO[] => {
  switch (status) {
    case "С вакансиями": {
      return projects.filter(
        (project) =>
          project.teamLimit && project.teamLimit > project.teams.length
      );
    }
    default: {
      return projects;
    }
  }
};

export const applyPostFilters = (
  filters: ProjectFilters,
  projects: ProjectDTO[]
): ProjectDTO[] => {
  const functions: ((projects: ProjectDTO[]) => ProjectDTO[])[] = [
    statusPostFilters.bind(null, filters.status || ""),
  ];

  return functions.reduce((acc, cur) => cur(acc), projects);
};
