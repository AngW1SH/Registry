export interface Team {
  id: number;
  name: string;
  users: number[];
}
export interface TeamWithAdministrators extends Team {
  administrators: number[];
}
