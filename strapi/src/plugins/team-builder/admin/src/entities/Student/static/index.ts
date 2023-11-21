import { IStudent } from "..";
import { IStudentDetailed } from "../types";

export const staticStudentList: IStudentDetailed[] = [
  {
    id: 1,
    name: "Лалуев Денис Витальевич",
    form: {
      formId: 1,
      data: [
        {
          question: "Опыт работы",
          answer: "5 лет",
        },
      ],
    },
  },
  {
    id: 2,
    name: "Степанов Максим Георгиевич",
    form: {
      formId: 1,
      data: [
        {
          question: "Опыт работы",
          answer: "25 лет",
        },
      ],
    },
  },
  {
    id: 3,
    name: "Ситников Владлен Владимирович",
    form: {
      formId: 1,
      data: [
        {
          question: "Опыт работы",
          answer: "2 года",
        },
      ],
    },
  },
  {
    id: 4,
    name: "Лазарев Илья Романович",
    form: {
      formId: 1,
      data: [
        {
          question: "Опыт работы",
          answer: "Нет",
        },
      ],
    },
  },
];
