export interface IStudent {
  id: number;
  name: string;
}

export interface IStudentDetailed extends IStudent {
  formResults: {
    form: number;
    data: FormRow[];
  };
}

export interface FormRow {
  question: string;
  answer: string;
}
