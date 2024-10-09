export interface IUser {
  id: number;
  name: string;
}

export interface IUserWithUnassignedData extends IUser {
  unassignedTeams: number[];
  unassignedAdministrated: number[];
}
