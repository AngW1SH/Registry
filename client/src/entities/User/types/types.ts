export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface IUserWithRole extends IUser {
  role: string;
}

export interface IUserWithUnassignedData extends IUser {
  unassignedTeams: number[];
  unassignedAdministrated: number[];
}
