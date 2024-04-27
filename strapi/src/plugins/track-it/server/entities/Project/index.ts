export interface Project {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
}

export interface ProjectDTO {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface ProjectDetailed extends Project {
  syncDate: Date;
}

export interface ProjectDetailedDTO extends ProjectDTO {
  syncDate: string;
}

export const projectAdapter = (projectListStrapi: any): ProjectDTO[] => {
  return projectListStrapi.map((projectStrapi) => ({
    id: projectStrapi.id,
    name: projectStrapi.name,
    startDate: projectStrapi.dateStart,
    endDate: projectStrapi.dateStart,
  }));
};
