export interface ITeam {
  id: number;
  name: string;
  users: number[];
}

export interface ITeamExtended extends ITeam {
  project: number | null;
  requests: number[];
}
