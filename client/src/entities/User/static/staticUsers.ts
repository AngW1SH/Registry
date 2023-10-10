import { IUser, IUserWithRole } from "../types/types";

export const staticUsers: IUser[] = [
  {
    id: 3,
    name: "Авдеева София Данииловна",
    email: "st489186@student.spbu.ru",
  },
  {
    id: 5,
    name: "Горшков Иван Григорьевич",
    email: "st461158@student.spbu.ru",
  },
  {
    id: 6,
    name: "Гришина София Кирилловна",
    email: "st965928@student.spbu.ru",
  },
  {
    id: 7,
    name: "Евдокимова Владислава Андреевна",
    email: "st631633@student.spbu.ru",
  },
  {
    id: 8,
    name: "Ермилов Иван Макарович",
    email: "st393827@student.spbu.ru",
  },
];

export const staticUsersWithRoles: IUserWithRole[] = [
  {
    id: 3,
    name: "Авдеева София Данииловна",
    role: "Teamlead",
    email: "st489186@student.spbu.ru",
  },
  {
    id: 5,
    name: "Горшков Иван Григорьевич",
    role: "Системный администратор",
    email: "st461158@student.spbu.ru",
  },
  {
    id: 6,
    name: "Гришина София Кирилловна",
    role: "Инженер технической поддержки",
    email: "st965928@student.spbu.ru",
  },
  {
    id: 7,
    name: "Евдокимова Владислава Андреевна",
    role: "Тестировщик (QA Engineer)",
    email: "st631633@student.spbu.ru",
  },
  {
    id: 8,
    name: "Ермилов Иван Макарович",
    role: "Frontend-разработчик",
    email: "st393827@student.spbu.ru",
  },
];
