export interface IMember {
  id: number;
  name: string;
  role: string;
  team: number;
  user: number;
  isAdministator: boolean | null;
}
