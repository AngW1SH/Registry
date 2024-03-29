export interface IForm {
  form: IFormTemplate | null;
  results: IFormResults[];
  selected: number[]; // the indices of the selected results
}

export enum ImportStatus {
  default = "DEFAULT",
  fulfilled = "FULFILLED",
  rejected = "REJECTED",
}

export enum IFormType {
  google = "Google Forms",
}

export interface IFormTemplate {
  id: number;
  name: string;
  link: string;
  type: IFormType;
  formId: string;
  identifiers: {
    id: number;
    question: string;
    provider: string;
  }[];
}

export type IFormQuestion = IFormQuestionDefault | IFormQuestionGrid;

export type IFormResults = {
  status: ImportStatus;
  value: IFormQuestion[];
};

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
