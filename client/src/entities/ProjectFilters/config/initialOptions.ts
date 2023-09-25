export type MultiselectFilterData = {
  label: string;
  options: string[];
};

export type DetailedFiltersData = {
  status: MultiselectFilterData;
  supervisor: MultiselectFilterData;
  year: MultiselectFilterData;
  format: MultiselectFilterData;
};

export const detailedFiltersInitialData: DetailedFiltersData = {
  status: {
    label: "Статус активности",
    options: ["Все", "Активные", "Завершённые", "С вакансиями"],
  },
  supervisor: {
    label: "ФИО руководителя",
    options: [
      "Иванов Павел Михайлович",
      "Гордеев Сергей Алексеевич",
      "Волков Игорь Иванович",
    ],
  },
  year: {
    label: "Курс",
    options: ["2 курс", "3 курс", "Магистратура"],
  },
  format: {
    label: "Тип занятости",
    options: ["Очный", "Удалённый", "Комбинированный"],
  },
};
