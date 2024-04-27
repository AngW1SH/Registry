export interface IProject {
  id: number;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  syncDate: Date | null;
}

export interface IProjectDTO {
  id: number;
  name: string;
  startDate: string | null;
  endDate: string | null;
  syncDate: string | null;
}

export const projectAdapter = (project: IProjectDTO): IProject => ({
  id: project.id,
  name: project.name,
  startDate: project.startDate ? new Date(project.startDate) : null,
  endDate: project.endDate ? new Date(project.endDate) : null,
  syncDate: project.syncDate ? new Date(project.syncDate) : null,
});
