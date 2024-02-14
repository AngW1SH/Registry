import { Profile, ProfileDTO } from "../types/types";

export const staticProfileTeamAssigned: ProfileDTO = {
  forms: [
    {
      id: 1,
      name: "Анкета для студентов ПМ-ПУ",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeucShuu9WjbZVa0gD1-MjQgySPoO9sh6L8kbQGl04BvF55fg/viewform?usp=sf_link",
      completed: "2023-10-26T15:43:25.385Z",
    },
    {
      id: 2,
      name: "Новая анкета для студентов ПМ-ПУ",
      link: "https://vk.com",
      completed: null,
    },
  ],
  requests: [],
  teams: [
    {
      id: 4,
      name: "Горшков И.Г., Гришина С.К., Авдеева С.Д., Ермилов И.М., Евдокимова В.А., Лалуев Д.В. - Биология растений в эпоху глобальных изменений климата",
      members: [2, 3, 1, 5, 4, 21],
      project: "1",
    },
  ],
  members: [
    {
      id: 2,
      role: "Системный администратор",
      name: "Горшков И.Г. - Системный администратор",
      isAdministrator: false,
      user: 5,
      team: 4,
    },
    {
      id: 3,
      role: "Инженер технической поддержки",
      name: "Гришина С.К. - Инженер технической поддержки",
      isAdministrator: false,
      user: 6,
      team: 4,
    },
    {
      id: 1,
      role: "Teamlead",
      name: "Авдеева С.Д. - Teamlead",
      isAdministrator: true,
      user: 3,
      team: 4,
    },
    {
      id: 5,
      role: "Frontend-разработчик",
      name: "Ермилов И.М. - Frontend-разработчик",
      isAdministrator: false,
      user: 8,
      team: 4,
    },
    {
      id: 4,
      role: "Тестировщик (QA Engineer)",
      name: "Евдокимова В.А. - Тестировщик (QA Engineer)",
      isAdministrator: false,
      user: 7,
      team: 4,
    },
    {
      id: 21,
      role: "Разработчик",
      name: "Лалуев Д.В. - Разработчик",
      isAdministrator: true,
      user: 24,
      team: 4,
    },
  ],
  users: [
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
      id: 3,
      name: "Авдеева София Данииловна",
      email: "st489186@student.spbu.ru",
    },
    {
      id: 8,
      name: "Ермилов Иван Макарович",
      email: "st393827@student.spbu.ru",
    },
    {
      id: 7,
      name: "Евдокимова Владислава Андреевна",
      email: "st631633@student.spbu.ru",
    },
    { id: 24, name: "Лалуев Денис Витальевич", email: "laluevdenis@yandex.ru" },
  ],
  projects: [
    {
      id: "1",
      name: "Биология растений в эпоху глобальных изменений климата",
      description:
        "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
      dateStart: "2023-10-18",
      dateEnd: "2023-12-01",
      enrollmentStart: "2023-08-20",
      enrollmentEnd: "2023-10-17",
      supervisor: "Иванов П. М.",
      curator: "Калашникова П. М.",
      client: 'ООО "Рога и Копыто"',
      teamLimit: 2,
      teams: [4],
      tags: [],
    },
  ],
  user: { teams: [4], administratedTeams: [4], projects: [] },
};

export const staticProfileTeamHiring: ProfileDTO = {
  forms: [
    {
      id: 1,
      name: "Анкета для студентов ПМ-ПУ",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSeucShuu9WjbZVa0gD1-MjQgySPoO9sh6L8kbQGl04BvF55fg/viewform?usp=sf_link",
      completed: "2023-10-26T15:43:25.385Z",
    },
    {
      id: 2,
      name: "Новая анкета для студентов ПМ-ПУ",
      link: "https://vk.com",
      completed: null,
    },
  ],
  requests: [{ id: 29, team: 4, project: "1", files: [] }],
  teams: [
    {
      id: 4,
      name: "Горшков И.Г., Гришина С.К., Авдеева С.Д., Ермилов И.М., Евдокимова В.А., Лалуев Д.В. - Биология растений в эпоху глобальных изменений климата",
      members: [2, 3, 1, 5, 4, 21],
      project: null,
      requests: [29],
    },
  ],
  members: [
    {
      id: 2,
      role: "Системный администратор",
      name: "Горшков И.Г. - Системный администратор",
      isAdministrator: false,
      user: 5,
      team: 4,
    },
    {
      id: 3,
      role: "Инженер технической поддержки",
      name: "Гришина С.К. - Инженер технической поддержки",
      isAdministrator: false,
      user: 6,
      team: 4,
    },
    {
      id: 1,
      role: "Teamlead",
      name: "Авдеева С.Д. - Teamlead",
      isAdministrator: true,
      user: 3,
      team: 4,
    },
    {
      id: 5,
      role: "Frontend-разработчик",
      name: "Ермилов И.М. - Frontend-разработчик",
      isAdministrator: false,
      user: 8,
      team: 4,
    },
    {
      id: 4,
      role: "Тестировщик (QA Engineer)",
      name: "Евдокимова В.А. - Тестировщик (QA Engineer)",
      isAdministrator: false,
      user: 7,
      team: 4,
    },
    {
      id: 21,
      role: "Разработчик",
      name: "Лалуев Д.В. - Разработчик",
      isAdministrator: true,
      user: 24,
      team: 4,
    },
  ],
  users: [
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
      id: 3,
      name: "Авдеева София Данииловна",
      email: "st489186@student.spbu.ru",
    },
    {
      id: 8,
      name: "Ермилов Иван Макарович",
      email: "st393827@student.spbu.ru",
    },
    {
      id: 7,
      name: "Евдокимова Владислава Андреевна",
      email: "st631633@student.spbu.ru",
    },
    { id: 24, name: "Лалуев Денис Витальевич", email: "laluevdenis@yandex.ru" },
  ],
  projects: [
    {
      id: "1",
      name: "Биология растений в эпоху глобальных изменений климата",
      description:
        "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
      dateStart: "2023-10-18",
      dateEnd: "2023-12-01",
      enrollmentStart: "2023-08-20",
      enrollmentEnd: "2023-10-17",
      supervisor: "Иванов П. М.",
      curator: "Калашникова П. М.",
      client: 'ООО "Рога и Копыто"',
      teamLimit: 2,
      teams: [],
      tags: [],
    },
  ],
  user: { teams: [4], administratedTeams: [4], projects: ["1"] },
};
