export interface IStudent {
  id: number;
  name: string;
}

export interface IStudentDetailed extends IStudent {
  form: {
    formId: number;
    data: FormRow[];
  };
}

export type FormRow = FormRowDefault | FormRowGrid;

export interface FormRowDefault {
  type: "DEFAULT";
  question: string;
  answer: string;
}

export interface FormRowGrid {
  type: "GRID";
  question: string;
  rows: string[];
  answers: string[];
}
