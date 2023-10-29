export interface ITeam {
  id: number;
  name: string;
  members: number[];
}

export interface ITeamExtended extends ITeam {
  project?: number | null;
  requests?: number[];
}
