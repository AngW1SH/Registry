export interface IRequest {
  id: number;
  team: number | null;
  project: number | null;
  files: {
    id: number;
    name: string;
    url: string;
    type: string;
    size: string;
  }[];
}
