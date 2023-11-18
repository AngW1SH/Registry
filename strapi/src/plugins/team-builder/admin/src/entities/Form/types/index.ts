export interface IForm {
  id: number;
  name: string;
}

export interface IFormDetailed extends IForm {
  questions: string[];
}
