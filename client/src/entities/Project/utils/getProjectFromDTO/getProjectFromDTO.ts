import {
  IProject,
  IProjectSingle,
  IProjectSingleDTO,
  ProjectDTO,
} from "../../types/types";

export const getProjectFromDTO = (projectDTO: ProjectDTO): IProject => {
  return {
    ...projectDTO,
    dateStart: new Date(projectDTO.dateStart),
    dateEnd: new Date(projectDTO.dateEnd),
    enrollmentStart: new Date(projectDTO.enrollmentStart),
    enrollmentEnd: new Date(projectDTO.enrollmentEnd),
  };
};

export const getProjectSingleFromDTO = (
  projectDTO: IProjectSingleDTO,
): IProjectSingle => {
  return {
    ...projectDTO,
    dateStart: new Date(projectDTO.dateStart),
    dateEnd: new Date(projectDTO.dateEnd),
    enrollmentStart: new Date(projectDTO.enrollmentStart),
    enrollmentEnd: new Date(projectDTO.enrollmentEnd),
    related: projectDTO.related.map((project) => getProjectFromDTO(project)),
  };
};
