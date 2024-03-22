import { IResourceField } from "..";

export interface IResource {
  id: string;
  name: string;
  project: string; // Project id
  platform: string; // Platform id
  params: IResourceField[]; // API Endpoint, API keys, etc
}
