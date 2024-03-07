export interface IResource {
  id: string;
  name: string;
  project: string; // Project id
  platform: string; // Platform id
  params: {
    [key: string]: any;
  }; // API Endpoint, API keys, etc
}
