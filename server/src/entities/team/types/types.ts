export interface Team {
  id: number;
  name: string;
  members: number[];
}
export interface TeamWithAdministrators extends Team {
  administrators: number[];
}
