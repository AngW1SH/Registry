export interface ITeam {
  id: number;
  name: string;
  members: number[];
}

export interface ITeamExtended extends ITeam {
  project?: string | null;
  requests?: number[];
}
