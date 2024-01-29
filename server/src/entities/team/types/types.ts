export interface Team {
  id: number;
  name: string;
  members: number[];
  project?: string | null;
  requests?: number[];
}
export interface TeamWithAdministrators extends Team {
  administrators: number[];
}
