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

export interface FormRow {
  question: string;
  answer: string;
}
