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

export const projectAdapter = <T extends ProjectDTO>(
  projectListStrapi: T[]
): ProjectDTO[] => {
  return projectListStrapi.map((formStrapi) => ({
    id: formStrapi.id,
    name: formStrapi.name,
    startDate: formStrapi.startDate,
    endDate: formStrapi.endDate,
  }));
};
