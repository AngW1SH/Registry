export interface IMember {
  id: number;
  name: string;
  roles: string[];
  team: number;
  user: number;
  isAdministrator: boolean | null;
}
