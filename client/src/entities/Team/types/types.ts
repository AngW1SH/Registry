export interface ITeam {
  id: number;
  name: string;
  members: number[];
  documents?: IProjectDocument[];
}

export interface IProjectDocument {
  id: number;
  name: string;
  date: string;
  url: string;
  type: string;
  size: string;
  category: string;
}

export interface ITeamExtended extends ITeam {
  project?: string | null;
  requests?: number[];
}
