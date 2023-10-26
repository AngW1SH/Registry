export interface FormResultStrapi {
  id: number;
  file: {
    data: {
      id: number;
    } | null;
  };
  form: {
    data: {
      id: number;
    } | null;
  };
  date: string;
}
