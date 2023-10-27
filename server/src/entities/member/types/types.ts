export interface Member {
  id: number;
  name: string;
  role: string;
  isAdministrator: boolean | null;
  team: number | null;
  user: number | null;
}
