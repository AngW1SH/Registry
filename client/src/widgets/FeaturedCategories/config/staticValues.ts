import { CategoryCard } from "../types/types";

export const staticValues: CategoryCard[] = [
  {
    type: "image",
    name: "Математическое моделирование",
    image: "/category-bg-1.jpg",
    link: "/",
    projectsCount: 39,
  },
  {
    type: "detailed",
    name: "Математический анализ",
    showMore: true,
    link: "/",
    tags: [
      {
        id: "1",
        name: "Дифференциальные методы",
        projectsCount: 79,
      },
      {
        id: "2",
        name: "Теория чисел",
        projectsCount: 34,
      },
      {
        id: "3",
        name: "Прикладная математика",
        projectsCount: 17,
      },
      {
        id: "4",
        name: "Математическая философия",
        projectsCount: 364,
      },
      {
        id: "5",
        name: "Функциональный анализ",
        projectsCount: 34,
      },
      {
        id: "6",
        name: "Практикум",
        projectsCount: 10,
      },
    ],
  },
  {
    type: "detailed",
    name: "Машинное обучение",
    link: "/",
    showMore: false,
    tags: [
      {
        id: "7",
        name: "Робототехника",
        projectsCount: 749,
      },
      {
        id: "8",
        name: "Искусственный интеллект",
        projectsCount: 34,
      },
      {
        id: "9",
        name: "Системы управления",
        projectsCount: 14,
      },
      {
        id: "10",
        name: "Программирование",
        projectsCount: 366,
      },
      {
        id: "11",
        name: "Практикум",
        projectsCount: 10,
      },
    ],
  },
  {
    type: "image",
    name: "Web разработка",
    image: "/category-bg-4.jpg",
    link: "/",
    projectsCount: 125,
  },
  {
    type: "detailed",
    name: "История",
    link: "/",
    showMore: false,
    tags: [
      {
        id: "12",
        name: "История XV-XVI вв",
        projectsCount: 79,
      },
      {
        id: "13",
        name: "История XX в",
        projectsCount: 34,
      },
      {
        id: "14",
        name: "История V-XVI вв",
        projectsCount: 17,
      },
      {
        id: "15",
        name: "Древний восток",
        projectsCount: 79,
      },
      {
        id: "16",
        name: "История XIX в",
        projectsCount: 34,
      },
      {
        id: "17",
        name: "История V-XIV в",
        projectsCount: 17,
      },
    ],
  },
  {
    type: "detailed",
    name: "Биология",
    link: "/",
    showMore: true,
    tags: [
      {
        id: "27",
        name: "Генетика",
        projectsCount: 79,
      },
      {
        id: "19",
        name: "Клеточная биология",
        projectsCount: 34,
      },
      {
        id: "20",
        name: "Протеомика",
        projectsCount: 17,
      },
      {
        id: "21",
        name: "Фармакология",
        projectsCount: 364,
      },
      {
        id: "31",
        name: "Секвенирование",
        projectsCount: 34,
      },
    ],
  },
  {
    type: "image",
    name: "Юриспруденция",
    link: "/",
    image: "/category-bg-7.jpg",
    projectsCount: 39,
  },
  {
    type: "detailed",
    name: "Медицинская генетика",
    showMore: true,
    link: "/",
    tags: [
      {
        id: "18",
        name: "ДНК, РНК",
        projectsCount: 79,
      },
      {
        id: "19",
        name: "Клеточная биология",
        projectsCount: 34,
      },
      {
        id: "20",
        name: "Протеомика",
        projectsCount: 17,
      },
      {
        id: "21",
        name: "Фармакалогия",
        projectsCount: 364,
      },
      {
        id: "22",
        name: "Секвенирование",
        projectsCount: 34,
      },
      {
        id: "23",
        name: "Клеточная биология",
        projectsCount: 10,
      },
    ],
  },
  {
    type: "image",
    name: "Финансы и право",
    link: "/",
    image: "/category-bg-9.jpg",
    projectsCount: 39,
  },
  {
    type: "detailed",
    name: "Социология",
    link: "/",
    showMore: false,
    tags: [
      {
        id: "24",
        name: "Общество",
        projectsCount: 79,
      },
      {
        id: "25",
        name: "Языки",
        projectsCount: 34,
      },
      {
        id: "26",
        name: "Социальные тенденции",
        projectsCount: 17,
      },
    ],
  },
];
