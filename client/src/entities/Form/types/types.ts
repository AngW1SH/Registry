export interface IForm {
  id: number;
  name: string;
  link: string;
  completed: Date | null;
}

export interface IFormDTO {
  id: number;
  name: string;
  link: string;
  completed: string | null;
}
