export const staticProjectsWithTagsPrisma = [
  {
    id: "1",
    name: "Биология растений в эпоху глобальных изменений климата",
    description:
      "ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    developerRequirements:
      " ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    dateStart: new Date("2023-09-01"),
    dateEnd: new Date("2023-12-01"),
    enrollmentStart: new Date("2023-08-20"),
    enrollmentEnd: new Date("2023-09-01"),
    supervisor: "Иванов П. М.",
    tags: [
      {
        Tag: {
          id: "1",
          name: "Философия",
        },
      },
      {
        Tag: {
          id: "2",
          name: "Биология",
        },
      },
    ],
    isPublic: true,
  },
  {
    id: "4",
    name: "Изучение социально-экономических проблем соверменного испанского общества",
    description:
      "ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    developerRequirements:
      " ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    dateStart: new Date("2023-09-07"),
    dateEnd: new Date("2023-12-10"),
    enrollmentStart: new Date("2023-09-01"),
    enrollmentEnd: new Date("2023-09-07"),
    supervisor: "Новиков В. С.",
    tags: [
      {
        Tag: {
          id: "3",
          name: "Социология",
        },
      },
    ],
    isPublic: true,
  },
];

export const staticProjectsWithTags = [
  {
    id: "1",
    name: "Биология растений в эпоху глобальных изменений климата",
    description:
      "ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    developerRequirements:
      " ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    dateStart: new Date("2023-09-01"),
    dateEnd: new Date("2023-12-01"),
    enrollmentStart: new Date("2023-08-20"),
    enrollmentEnd: new Date("2023-09-01"),
    supervisor: "Иванов П. М.",
    tags: [
      {
        id: "1",
        name: "Философия",
      },
      {
        id: "2",
        name: "Биология",
      },
    ],
    isPublic: true,
  },
  {
    id: "4",
    name: "Изучение социально-экономических проблем соверменного испанского общества",
    description:
      "ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    developerRequirements:
      " ulla eu sem sit amet sem facilisis vehicula sit amet commodo magna tincidunt leo et tortor lacinia, non commodo ipsum efficitur",
    dateStart: new Date("2023-09-07"),
    dateEnd: new Date("2023-12-10"),
    enrollmentStart: new Date("2023-09-01"),
    enrollmentEnd: new Date("2023-09-07"),
    supervisor: "Новиков В. С.",
    tags: [
      {
        id: "3",
        name: "Социология",
      },
    ],
    isPublic: true,
  },
];

export const staticProjectsWithTagsResult = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Биология растений в эпоху глобальных изменений климата",
        description:
          "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
        developerRequirements:
          "Экспертное знание в области биологии растений и экологии для более глубокого понимания взаимосвязей между климатическими изменениями и растительными экосистемами. Опыт в проведении исследований, включая умение планировать и осуществлять эксперименты, анализировать данные и делать выводы. Навыки анализа данных и использования статистических методов для интерпретации результатов и выявления закономерностей в изменениях растительного мира.",
        dateStart: "2023-09-09",
        dateEnd: "2023-12-01",
        enrollmentStart: "2023-08-20",
        enrollmentEnd: "2023-09-01",
        supervisor: "Иванов П. М.",
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
        description:
          "Проект представляет собой исследование актуальных вопросов в области общественного здоровья и медицины. Задача - анализ современных эпидемиологических тенденций, изучение микробиологических аспектов патогенов и распространения болезней, а также исследование вопросов гигиенических практик и их влияния на общественное здоровье. Цель проекта - обеспечить научное понимание современных вызовов и рисков, связанных с биологическими агентами и общественными здоровьем, и способствовать разработке стратегий для их управления и предотвращения.",
        developerRequirements:
          "Глубокое знание эпидемиологии, микробиологии и гигиеники для анализа современных проблем и вызовов в этих областях. Исследовательские навыки, включая способность анализа эпидемиологических данных, молекулярных и микробиологических исследований и статистических методов. Умение интерпретировать результаты исследований и делать выводы, имея в виду публичное здоровье.",
        dateStart: "2023-09-09",
        dateEnd: "2023-12-10",
        enrollmentStart: "2023-09-01",
        enrollmentEnd: "2023-09-07",
        supervisor: "Беляев Ф. П.",
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
        description:
          "Проект направлен на исследование ключевых аспектов, влияющих на современную испанскую социально-экономическую динамику. Требуется провести анализ ряда факторов, включая безработицу, социальное неравенство, систему образования и здравоохранения, а также влияние глобальных экономических трендов на испанскую экономику.",
        developerRequirements:
          "Знание испанского языка на высоком уровне для эффективной коммуникации с местными экспертами и населением. Экономические и социологические знания и методологии для проведения анализа социальных и экономических данных. Исследовательские навыки, включая сбор и анализ данных, проведение интервью и опросов, а также способность к критическому мышлению.",
        dateStart: "2023-09-07",
        dateEnd: "2023-10-12",
        enrollmentStart: "2023-09-01",
        enrollmentEnd: "2023-09-07",
        supervisor: "Новиков В. С.",
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
        description:
          "Проект посвящен всестороннему изучению генетически модифицированных организмов (ГМО). Следует провести анализ исторического развития технологии ГМО, исследование достижений в области генной инженерии и оценку социальные и экологических рисков, связанных с применением ГМО в сельском хозяйстве и продовольственной промышленности. Цель проекта - обеспечить обширное понимание проблематики ГМО с учетом научных, социальных и экологических аспектов и предоставить информацию для принятия обоснованных решений и разработки регулирующей политики.",
        developerRequirements:
          "Глубокое понимание биологии и генетики для анализа принципов генной инженерии и технологии ГМО. Исследовательские навыки, включая способность анализа научных статей, публикаций и данных в области ГМО. Экологические знания для оценки влияния ГМО на окружающую среду и биоразнообразие. Знание социологии и политических наук для изучения общественных и политических аспектов использования ГМО.",
        dateStart: "2023-02-01",
        dateEnd: "2023-06-01",
        enrollmentStart: "2023-01-20",
        enrollmentEnd: "2023-02-01",
        supervisor: "Старикова П. М.",
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
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 4,
    },
  },
};

export const staticProjectDetailedStrapi = {
  data: [
    {
      id: 1,
      attributes: {
        name: "Биология растений в эпоху глобальных изменений климата",
        description:
          "Необходимо провести анализ адаптации растений к экстремальным условиям, возникающим в результате глобальных изменений климата. Важно оценить воздействие глобальных изменений климата на биоразнообразие растительного мира. Задачей является выявление потенциальных угроз экосистемам и сельскому хозяйству, обусловленных изменениями климата.",
        dateStart: "2023-09-09",
        dateEnd: "2023-12-01",
        enrollmentStart: "2023-08-20",
        enrollmentEnd: "2023-09-01",
        supervisor: "Иванов П. М.",
        createdAt: "2023-09-29T17:30:18.522Z",
        updatedAt: "2023-10-09T20:23:52.882Z",
        publishedAt: "2023-09-29T17:31:35.405Z",
        curator: "Калашникова П. М.",
        client: 'ООО "Рога и Копыто"',
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
        team: {
          data: {
            id: 4,
            attributes: {
              createdAt: "2023-10-09T18:56:55.343Z",
              updatedAt: "2023-10-09T19:01:06.113Z",
              publishedAt: "2023-10-09T18:56:56.294Z",
              name: "4. Авдеева С.Д., Горшков И.Г., Гришкина С.К., Евдокимова В.А., Ермилов И.М.",
              members: {
                data: [
                  {
                    id: 1,
                    attributes: {
                      role: "Teamlead",
                      createdAt: "2023-10-09T17:57:57.112Z",
                      updatedAt: "2023-10-09T18:37:41.230Z",
                      publishedAt: "2023-10-09T18:37:32.937Z",
                      name: "1. Авдеева С.Д. - Teamlead",
                      user: {
                        data: {
                          id: 3,
                          attributes: {
                            name: "Авдеева София Данииловна",
                            email: "st489186@student.spbu.ru",
                          },
                        },
                      },
                    },
                  },
                  {
                    id: 2,
                    attributes: {
                      role: "Системный администратор",
                      createdAt: "2023-10-09T18:39:04.485Z",
                      updatedAt: "2023-10-09T18:39:06.014Z",
                      publishedAt: "2023-10-09T18:39:06.012Z",
                      name: "2. Горшков И.Г. - Системный администратор",
                      user: {
                        data: {
                          id: 5,
                          attributes: {
                            name: "Горшков Иван Григорьевич",
                            email: "st461158@student.spbu.ru",
                          },
                        },
                      },
                    },
                  },
                  {
                    id: 3,
                    attributes: {
                      role: "Инженер технической поддержки",
                      createdAt: "2023-10-09T18:39:26.386Z",
                      updatedAt: "2023-10-09T18:39:26.756Z",
                      publishedAt: "2023-10-09T18:39:26.755Z",
                      name: "3. Гришкина С.К. - Инженер технической поддержки",
                      user: {
                        data: {
                          id: 6,
                          attributes: {
                            name: "Гришина София Кирилловна",
                            email: "st965928@student.spbu.ru",
                          },
                        },
                      },
                    },
                  },
                  {
                    id: 4,
                    attributes: {
                      role: "Тестировщик (QA Engineer)",
                      createdAt: "2023-10-09T18:39:55.042Z",
                      updatedAt: "2023-10-09T18:39:55.673Z",
                      publishedAt: "2023-10-09T18:39:55.672Z",
                      name: "4. Евдокимова В.А. - Тестировщик (QA Engineer)",
                      user: {
                        data: {
                          id: 7,
                          attributes: {
                            name: "Евдокимова Владислава Андреевна",
                            email: "st631633@student.spbu.ru",
                          },
                        },
                      },
                    },
                  },
                  {
                    id: 5,
                    attributes: {
                      role: "Frontend-разработчик",
                      createdAt: "2023-10-09T18:40:32.834Z",
                      updatedAt: "2023-10-09T18:40:33.412Z",
                      publishedAt: "2023-10-09T18:40:33.409Z",
                      name: "5. Ермилов И.М. - Frontend-разработчик",
                      user: {
                        data: {
                          id: 8,
                          attributes: {
                            name: "Ермилов Иван Макарович",
                            email: "st393827@student.spbu.ru",
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
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
      },
    },
  ],
};
