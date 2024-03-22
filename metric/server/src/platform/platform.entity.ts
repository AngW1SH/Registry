export interface Platform {
  id: string;
  name: string;
}

export interface PlatformDTO {
  id: string;
  name: string;
}

export enum PlatformName {
  GitHub = 'GitHub',
  GitLab = 'GitLab',
}
