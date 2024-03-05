export interface IResource {
  id: string;
  name: string;
  project: string; // Project id
  platform: string; // Platform id
  params: string[]; // API Endpoint, API keys, etc
}
