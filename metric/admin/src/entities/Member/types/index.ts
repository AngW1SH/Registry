export interface IMember {
  name: string;
  roles: string[];
  identifiers: {
    platform: string;
    value: string;
  }[];
}
