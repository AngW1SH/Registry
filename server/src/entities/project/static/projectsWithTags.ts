import { ProjectListStrapi, ProjectStrapi } from "@/db/strapi/types/project";
import { Project } from "../types/types";

export const staticProjectList: Project[] = [
  {
    id: "1",
    name: "Биология растений в эпоху глобальных изменений климата",
    description:
      "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
    dateStart: new Date("2023-09-09"),
    dateEnd: new Date("2023-12-01"),
    enrollmentStart: new Date("2023-08-20"),
    enrollmentEnd: new Date("2023-09-01"),
    clientContact: "Иванов П. М.",
    curator: "Калашникова П. М.",
    client: 'ООО "Рога и Копыто"',
    tags: [8],
    teams: [4],
    teamLimit: 2,
  },
  {
    id: "2",
    name: "Изучение социально-экономических проблем современного испанского общества",
    description:
      "Проект направлен на исследование ключевых аспектов, влияющих на современную испанскую социально-экономическую динамику. Требуется провести анализ ряда факторов, включая безработицу, социальное неравенство, систему образования и здравоохранения, а также влияние глобальных экономических трендов на испанскую экономику.",
    dateStart: new Date("2023-09-07"),
    dateEnd: new Date("2023-10-12"),
    enrollmentStart: new Date("2023-09-01"),
    enrollmentEnd: new Date("2023-09-07"),
    clientContact: "Новиков В. С.",
    curator: "Лебедев А. М.",
    client: 'ООО "Альфа и Омега"',
    tags: [1, 5, 6],
    teams: [4, 6],
    teamLimit: 2,
  },
  {
    id: "3",
    name: "ГМО: история, достижения, социальные и экологические риски",
    description:
      "Проект посвящен всестороннему изучению генетически модифицированных организмов (ГМО). Следует провести анализ исторического развития технологии ГМО, исследование достижений в области генной инженерии и оценку социальные и экологических рисков, связанных с применением ГМО в сельском хозяйстве и продовольственной промышленности. Цель проекта - обеспечить обширное понимание проблематики ГМО с учетом научных, социальных и экологических аспектов и предоставить информацию для принятия обоснованных решений и разработки регулирующей политики.",
    dateStart: new Date("2023-02-01"),
    dateEnd: new Date("2023-06-01"),
    enrollmentStart: new Date("2023-01-20"),
    enrollmentEnd: new Date("2023-02-01"),
    clientContact: "Кириллов И. С.",
    curator: "Кузнецов Д. К.",
    client: 'ЗАО "Солнечные Лучи"',
    tags: [4, 8],
    teams: [5],
    teamLimit: 1,
  },
  {
    id: "4",
    name: "Современные проблемы эпидемиологии, микробиологии и гигиены",
    description:
      "Проект представляет собой исследование актуальных вопросов в области общественного здоровья и медицины. Задача - анализ современных эпидемиологических тенденций, изучение микробиологических аспектов патогенов и распространения болезней, а также исследование вопросов гигиенических практик и их влияния на общественное здоровье. Цель проекта - обеспечить научное понимание современных вызовов и рисков, связанных с биологическими агентами и общественными здоровьем, и способствовать разработке стратегий для их управления и предотвращения.",
    dateStart: new Date("2023-09-09"),
    dateEnd: new Date("2023-12-10"),
    enrollmentStart: new Date("2023-09-01"),
    enrollmentEnd: new Date("2023-09-07"),
    clientContact: "Беляев Ф. П.",
    curator: "Меркулова М. Р.",
    client: "ИП Макаров Н.Г.",
    tags: [1, 5],
    teams: [],
    teamLimit: 1,
  },
];

export const staticProjectListStrapi: ProjectListStrapi = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Биология растений в эпоху глобальных изменений климата",
        slug: "biology",
        description:
          "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
        dateStart: "2023-10-18",
        dateEnd: "2023-12-01",
        enrollmentStart: "2023-08-20",
        enrollmentEnd: "2023-10-17",
        clientContact: "Иванов П. М.",
        curator: "Калашникова П. М.",
        client: 'ООО "Рога и Копыто"',
        teamLimit: 2,
        tags: { data: [{ id: 8, attributes: { name: "Генетика" } }] },
        teams: { data: [{ id: 4, attributes: {} }] },
      },
    },
    {
      id: 4,
      attributes: {
        name: "Современные проблемы эпидемиологии, микробиологии и гигиены",
        slug: "microbiology",
        description:
          "Проект представляет собой исследование актуальных вопросов в области общественного здоровья и медицины. Задача - анализ современных эпидемиологических тенденций, изучение микробиологических аспектов патогенов и распространения болезней, а также исследование вопросов гигиенических практик и их влияния на общественное здоровье. Цель проекта - обеспечить научное понимание современных вызовов и рисков, связанных с биологическими агентами и общественными здоровьем, и способствовать разработке стратегий для их управления и предотвращения.",
        dateStart: "2023-09-09",
        dateEnd: "2023-12-10",
        enrollmentStart: "2023-09-01",
        enrollmentEnd: "2023-09-07",
        clientContact: "Беляев Ф. П.",
        curator: "Меркулова М. Р.",
        client: "ИП Макаров Н.Г.",
        teamLimit: null,
        tags: {
          data: [
            { id: 1, attributes: { name: "Общество" } },
            { id: 5, attributes: { name: "Социология" } },
          ],
        },
        teams: { data: [] },
      },
    },
    {
      id: 2,
      attributes: {
        name: "Изучение социально-экономических проблем современного испанского общества",
        slug: "spanish-society",
        description:
          "Проект направлен на исследование ключевых аспектов, влияющих на современную испанскую социально-экономическую динамику. Требуется провести анализ ряда факторов, включая безработицу, социальное неравенство, систему образования и здравоохранения, а также влияние глобальных экономических трендов на испанскую экономику.",
        dateStart: "2023-09-07",
        dateEnd: "2023-10-12",
        enrollmentStart: "2023-09-01",
        enrollmentEnd: "2023-09-07",
        clientContact: "Новиков В. С.",
        curator: "Лебедев А. М.",
        client: 'ООО "Альфа и Омега"',
        teamLimit: null,
        tags: {
          data: [
            { id: 1, attributes: { name: "Общество" } },
            { id: 5, attributes: { name: "Социология" } },
            { id: 6, attributes: { name: "Финансы" } },
          ],
        },
        teams: { data: [] },
      },
    },
    {
      id: 3,
      attributes: {
        name: "ГМО: история, достижения, социальные и экологические риски",
        slug: "gmo",
        description:
          "Проект посвящен всестороннему изучению генетически модифицированных организмов (ГМО). Следует провести анализ исторического развития технологии ГМО, исследование достижений в области генной инженерии и оценку социальные и экологических рисков, связанных с применением ГМО в сельском хозяйстве и продовольственной промышленности. Цель проекта - обеспечить обширное понимание проблематики ГМО с учетом научных, социальных и экологических аспектов и предоставить информацию для принятия обоснованных решений и разработки регулирующей политики.",
        dateStart: "2023-02-01",
        dateEnd: "2023-06-01",
        enrollmentStart: "2023-01-20",
        enrollmentEnd: "2023-02-01",
        clientContact: "Кириллов И. С.",
        curator: "Кузнецов Д. К.",
        client: 'ЗАО "Солнечные Лучи"',
        teamLimit: null,
        tags: {
          data: [
            { id: 4, attributes: { name: "Медицина" } },
            { id: 8, attributes: { name: "Генетика" } },
          ],
        },
        teams: { data: [] },
      },
    },
  ],
};

export const staticProjectsWithTagsResult: ProjectListStrapi = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Биология растений в эпоху глобальных изменений климата",
        slug: "biology",
        description:
          "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
        dateStart: "2023-10-18",
        dateEnd: "2023-12-01",
        enrollmentStart: "2023-08-20",
        enrollmentEnd: "2023-10-17",
        clientContact: "Иванов П. М.",
        curator: "Калашникова П. М.",
        client: 'ООО "Рога и Копыто"',
        teamLimit: 2,
        tags: {
          data: [
            {
              id: 8,
              attributes: {
                name: "Генетика",
              },
            },
          ],
        },
      },
    },
    {
      id: 4,
      attributes: {
        name: "Современные проблемы эпидемиологии, микробиологии и гигиены",
        slug: "microbiology",
        description:
          "Проект представляет собой исследование актуальных вопросов в области общественного здоровья и медицины. Задача - анализ современных эпидемиологических тенденций, изучение микробиологических аспектов патогенов и распространения болезней, а также исследование вопросов гигиенических практик и их влияния на общественное здоровье. Цель проекта - обеспечить научное понимание современных вызовов и рисков, связанных с биологическими агентами и общественными здоровьем, и способствовать разработке стратегий для их управления и предотвращения.",
        dateStart: "2023-09-09",
        dateEnd: "2023-12-10",
        enrollmentStart: "2023-09-01",
        enrollmentEnd: "2023-09-07",
        clientContact: "Беляев Ф. П.",
        curator: "Меркулова М. Р.",
        client: "ИП Макаров Н.Г.",
        teamLimit: null,
        tags: {
          data: [
            {
              id: 1,
              attributes: {
                name: "Общество",
              },
            },
            {
              id: 5,
              attributes: {
                name: "Социология",
              },
            },
          ],
        },
      },
    },
    {
      id: 2,
      attributes: {
        name: "Изучение социально-экономических проблем современного испанского общества",
        slug: "spanish-society",
        description:
          "Проект направлен на исследование ключевых аспектов, влияющих на современную испанскую социально-экономическую динамику. Требуется провести анализ ряда факторов, включая безработицу, социальное неравенство, систему образования и здравоохранения, а также влияние глобальных экономических трендов на испанскую экономику.",
        dateStart: "2023-09-07",
        dateEnd: "2023-10-12",
        enrollmentStart: "2023-09-01",
        enrollmentEnd: "2023-09-07",
        clientContact: "Новиков В. С.",
        curator: "Лебедев А. М.",
        client: 'ООО "Альфа и Омега"',
        teamLimit: null,
        tags: {
          data: [
            {
              id: 1,
              attributes: {
                name: "Общество",
              },
            },
            {
              id: 5,
              attributes: {
                name: "Социология",
              },
            },
            {
              id: 6,
              attributes: {
                name: "Финансы",
              },
            },
          ],
        },
      },
    },
    {
      id: 3,
      attributes: {
        name: "ГМО: история, достижения, социальные и экологические риски",
        slug: "gmo",
        description:
          "Проект посвящен всестороннему изучению генетически модифицированных организмов (ГМО). Следует провести анализ исторического развития технологии ГМО, исследование достижений в области генной инженерии и оценку социальные и экологических рисков, связанных с применением ГМО в сельском хозяйстве и продовольственной промышленности. Цель проекта - обеспечить обширное понимание проблематики ГМО с учетом научных, социальных и экологических аспектов и предоставить информацию для принятия обоснованных решений и разработки регулирующей политики.",
        dateStart: "2023-02-01",
        dateEnd: "2023-06-01",
        enrollmentStart: "2023-01-20",
        enrollmentEnd: "2023-02-01",
        clientContact: "Кириллов И. С.",
        curator: "Кузнецов Д. К.",
        client: 'ЗАО "Солнечные Лучи"',
        teamLimit: null,
        tags: {
          data: [
            {
              id: 4,
              attributes: {
                name: "Медицина",
              },
            },
            {
              id: 8,
              attributes: {
                name: "Генетика",
              },
            },
          ],
        },
      },
    },
  ],
};

export const staticProjectDetailedNoTeamStrapi: ProjectStrapi = {
  data: {
    id: 4,
    attributes: {
      name: "Современные проблемы эпидемиологии, микробиологии и гигиены",
      slug: "microbiology",
      description:
        "Проект представляет собой исследование актуальных вопросов в области общественного здоровья и медицины. Задача - анализ современных эпидемиологических тенденций, изучение микробиологических аспектов патогенов и распространения болезней, а также исследование вопросов гигиенических практик и их влияния на общественное здоровье. Цель проекта - обеспечить научное понимание современных вызовов и рисков, связанных с биологическими агентами и общественными здоровьем, и способствовать разработке стратегий для их управления и предотвращения.",
      dateStart: "2023-09-09",
      dateEnd: "2023-12-10",
      enrollmentStart: "2023-09-01",
      enrollmentEnd: "2023-09-07",
      clientContact: "Беляев Ф. П.",
      curator: "Меркулова М. Р.",
      client: "ИП Макаров Н.Г.",
      teamLimit: null,
      tags: {
        data: [
          { id: 1, attributes: { name: "Общество" } },
          { id: 5, attributes: { name: "Социология" } },
        ],
      },
      teams: { data: [] },
      developerRequirements: [
        {
          id: 1,
          developerRequirement:
            "Глубокое понимание современных проблем и вызовов в области эпидемиологии, микробиологии и гигиены",
        },
        {
          id: 2,
          developerRequirement:
            "Умение интерпретировать результаты и формулировать рекомендации на основе полученных данных",
        },
        {
          id: 3,
          developerRequirement:
            "Опыт работы с техническим оборудованием и программным обеспечением, связанным с микробиологией и эпидемиологией",
        },
      ],
      requests: { data: { attributes: { count: 1 } } },
      descriptionFiles: [],
      resultFiles: [],
    },
  },
};

export const staticProjectDetailedStrapi: ProjectStrapi = {
  data: {
    id: 1,
    attributes: {
      name: "Биология растений в эпоху глобальных изменений климата",
      slug: "biology",
      description:
        "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
      dateStart: "2023-10-18",
      dateEnd: "2023-12-01",
      enrollmentStart: "2023-08-20",
      enrollmentEnd: "2023-10-17",
      clientContact: "Иванов П. М.",
      curator: "Калашникова П. М.",
      client: 'ООО "Рога и Копыто"',
      teamLimit: 2,
      tags: { data: [{ id: 8, attributes: { name: "Генетика" } }] },
      teams: {
        data: [
          {
            id: 4,
            attributes: {
              name: "Горшков И.Г., Гришина С.К., Ермилов И.М., Евдокимова В.А., Авдеева С.Д.",
              members: {
                data: [
                  {
                    id: 2,
                    attributes: {
                      role: "Системный администратор",
                      name: "Горшков И.Г. - Системный администратор",
                      user: {
                        data: {
                          id: 5,
                          attributes: {
                            name: "Горшков Иван Григорьевич",
                            email: "st461158@student.spbu.ru",
                          },
                        },
                      },
                      team: {
                        data: {
                          id: 1,
                        },
                      },
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      role: "Инженер технической поддержки",
                      name: "Гришина С.К. - Инженер технической поддержки",
                      user: {
                        data: {
                          id: 6,
                          attributes: {
                            name: "Гришина София Кирилловна",
                            email: "st965928@student.spbu.ru",
                          },
                        },
                      },
                      team: {
                        data: {
                          id: 1,
                        },
                      },
                    },
                  },
                  {
                    id: 1,
                    attributes: {
                      role: "Teamlead",
                      name: "Авдеева С.Д. - Teamlead",
                      user: {
                        data: {
                          id: 3,
                          attributes: {
                            name: "Авдеева София Данииловна",
                            email: "st489186@student.spbu.ru",
                          },
                        },
                      },
                      team: {
                        data: {
                          id: 1,
                        },
                      },
                    },
                  },
                  {
                    id: 5,
                    attributes: {
                      role: "Frontend-разработчик",
                      name: "Ермилов И.М. - Frontend-разработчик",
                      user: {
                        data: {
                          id: 8,
                          attributes: {
                            name: "Ермилов Иван Макарович",
                            email: "st393827@student.spbu.ru",
                          },
                        },
                      },
                      team: {
                        data: {
                          id: 1,
                        },
                      },
                    },
                  },
                  {
                    id: 4,
                    attributes: {
                      role: "Тестировщик (QA Engineer)",
                      name: "Евдокимова В.А. - Тестировщик (QA Engineer)",
                      user: {
                        data: {
                          id: 7,
                          attributes: {
                            name: "Евдокимова Владислава Андреевна",
                            email: "st631633@student.spbu.ru",
                          },
                        },
                      },
                      team: {
                        data: {
                          id: 1,
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      developerRequirements: [
        {
          id: 9,
          developerRequirement:
            "Опыт работы с лабораторным оборудованием и инструментами, связанными с биологией растений",
        },
        {
          id: 10,
          developerRequirement:
            "Глубокое понимание биологии растений и их реакции на изменения климата",
        },
        {
          id: 11,
          developerRequirement:
            "Способность оценивать влияние глобальных изменений климата на экосистемы и биоразнообразие",
        },
      ],
      requests: { data: { attributes: { count: 0 } } },
      descriptionFiles: [
        {
          id: 1,
          name: "Stats",
          date: "2023-11-06",
          file: {
            data: {
              id: 11,
              attributes: {
                name: "100.jpg",
                url: "/uploads/100_ecba989f3f.jpg",
                mime: "image/jpeg",
                size: 69.03,
              },
            },
          },
        },
        {
          id: 2,
          name: "Pirated Textbook",
          date: "2023-11-06",
          file: {
            data: {
              id: 21,
              attributes: {
                name: "Design Patterns Elements of Reusable Object-Oriented Software.pdf",
                url: "/uploads/Design_Patterns_Elements_of_Reusable_Object_Oriented_Software_427cc0144d.pdf",
                mime: "application/octet-stream",
                size: 19196.03,
              },
            },
          },
        },
      ],
      resultFiles: [],
    },
  },
};
