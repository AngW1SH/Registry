export interface Team {
  id: number;
  name: string;
  members: number[];
  project: number | null;
}
export interface TeamWithAdministrators extends Team {
  administrators: number[];
}
