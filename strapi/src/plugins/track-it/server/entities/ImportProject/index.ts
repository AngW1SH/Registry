export enum PlatformName {
  github = "GitHub",
  gitlab = "GitLab",
}

export interface ImportProject {
  id: string;
  name: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  resources: ImportResource[];
  members: ImportMember[];
}

export interface ImportResource {
  name: string;
  platform: PlatformName;
  params: string;
}

export interface ImportMember {
  name: string;
  roles: string[];
  identifiers: {
    platform: PlatformName;
    value: string;
  }[];
}

export enum ResourceFieldType {
  text = "text",
  textArray = "textArray",
}

export interface GenericResourceField {
  prop: string;
}

export interface ITextField extends GenericResourceField {
  type: ResourceFieldType.text;
  value: string;
}

export interface ITextArrayField extends GenericResourceField {
  type: ResourceFieldType.textArray;
  value: string[];
}

export type IResourceField = ITextField | ITextArrayField;
