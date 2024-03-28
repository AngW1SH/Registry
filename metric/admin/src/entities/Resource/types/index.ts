import { IResourceField } from "..";

export interface IResource {
  id: string;
  name: string;
  project: string; // Project id
  platform: string; // Platform id
  params: IResourceField[]; // API Endpoint, API keys, etc
}

export interface IResourceWithUsers extends IResource {
  users: { [key in string]: boolean }; // key = username, value = is selected
}
