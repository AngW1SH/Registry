export interface IForm {
  id: number;
  name: string;
}

export interface IFormDetailed extends IForm {
  questions: IFormQuestion[];
}

export type IFormQuestion = IFormQuestionDefault | IFormQuestionGrid;

export interface IFormQuestionDefault {
  type: "DEFAULT";
  question: string;
}

export interface IFormQuestionGrid {
  type: "GRID";
  question: string;
  rows: string[];
}
