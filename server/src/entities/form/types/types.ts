export enum FormType {
  google = "Google Forms",
}

export interface Form {
  id: number;
  name: string;
  link: string;
  type: FormType;
}

export interface FormResultClient {
  id: number;
  name: string;
  link: string;
  completed: Date | null;
}

export interface FormResult {
  id: number;
  file: number | null;
  form: number | null;
  date: string;
}
