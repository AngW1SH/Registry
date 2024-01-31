import { Form, FormType } from "..";

export const staticForms: Form[] = [
  {
    id: 1,
    name: "Анкета для студентов ПМ-ПУ",
    link: "https://test.com/form",
    type: FormType.google,
  },
  {
    id: 2,
    name: "Анкета для политологов",
    link: "https://test.com/otherform",
    type: FormType.google,
  },
];
