import { IMember } from "../types/types";

export const staticMembers: IMember[] = [
  {
    id: 2,
    roles: ["Системный администратор"],
    name: "Горшков И.Г. - Системный администратор",
    isAdministrator: false,
    user: 5,
    team: 4,
  },
  {
    id: 3,
    roles: ["Инженер технической поддержки"],
    name: "Гришина С.К. - Инженер технической поддержки",
    isAdministrator: false,
    user: 6,
    team: 4,
  },
  {
    id: 1,
    roles: ["Teamlead"],
    name: "Авдеева С.Д. - Teamlead",
    isAdministrator: true,
    user: 3,
    team: 4,
  },
  {
    id: 5,
    roles: ["Frontend-разработчик"],
    name: "Ермилов И.М. - Frontend-разработчик",
    isAdministrator: false,
    user: 8,
    team: 4,
  },
  {
    id: 4,
    roles: ["Тестировщик (QA Engineer)"],
    name: "Евдокимова В.А. - Тестировщик (QA Engineer)",
    isAdministrator: false,
    user: 7,
    team: 4,
  },
  {
    id: 21,
    roles: ["Разработчик"],
    name: "Лалуев Д.В. - Разработчик",
    isAdministrator: true,
    user: 24,
    team: 4,
  },
];
