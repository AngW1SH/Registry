export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserCreate = Omit<User, "id">;

export interface UserProjectStatusData {
  assignableTeams: number[]; // The administrated teams that haven't applied for the project
  hasApplied: boolean; // Whether there's a team that has applied (administrated or not)
}
