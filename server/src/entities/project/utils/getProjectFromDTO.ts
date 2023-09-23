import { Project, ProjectDTO } from "../types/types";

export const getProjectFromDTO = (projectDTO: ProjectDTO): Project => {
  return {
    ...projectDTO,
    dateStart: new Date(projectDTO.dateStart),
    dateEnd: new Date(projectDTO.dateEnd),
    enrollmentStart: new Date(projectDTO.enrollmentStart),
    enrollmentEnd: new Date(projectDTO.enrollmentEnd),
  };
};
