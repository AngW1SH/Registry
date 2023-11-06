export interface NewRequestsData {
  teams: {
    id: number;
    name: string;
    projects: number[];
  }[];
  projectReferences: {
    id: number;
    name: string;
  }[];
}
