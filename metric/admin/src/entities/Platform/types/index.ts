export interface IPlatform {
  id: string;
  name: PlatformName;
}

export enum PlatformName {
  GitHub = "GitHub",
  GitLab = "GitLab",
  Trello = "Trello",
}
