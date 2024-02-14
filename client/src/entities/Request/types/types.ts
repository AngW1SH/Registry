export interface IRequest {
  id: number;
  team: number | null;
  project: string | null;
  files: {
    id: number;
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
}
