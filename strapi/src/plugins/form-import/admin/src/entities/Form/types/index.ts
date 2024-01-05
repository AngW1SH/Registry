export interface IForm {
  type: string | null;
  results: IFormQuestion[][];
  selected: number[]; // the indices of the selected results
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
