export interface IForm {
  form: IFormTemplate | null;
  results: IFormQuestion[][];
  selected: number[]; // the indices of the selected results
}

export interface IFormTemplate {
  id: number;
  name: string;
  link: string;
  formid: string;
}

export type IFormQuestion = IFormQuestionDefault | IFormQuestionGrid;

export interface IFormQuestionDefault {
  type: "DEFAULT";
  question: string;
  answer: string;
}

export interface IFormQuestionGrid {
  type: "GRID";
  question: string;
  rows: string[];
  answers: string[];
}
