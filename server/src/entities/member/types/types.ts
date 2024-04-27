export interface Member {
  id: number;
  name: string;
  roles: string[];
  isAdministrator: boolean | null;
  team: number | null;
  user: number | null;
}
