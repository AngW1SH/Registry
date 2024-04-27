export interface IProject {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  syncDate: Date;
}

export interface IProjectDTO {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  syncDate: string;
}
