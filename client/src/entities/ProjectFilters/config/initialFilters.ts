import { Filters } from "../types/types";

export const initialFilters: Filters = {
  status: "Все",
  enrollmentStart: null,
  enrollmentEnd: null,
  dateStart: null,
  dateEnd: null,
  tags: null,
  text: null,
};

export const ProjectStatus = [
  "Все",
  "Активные",
  "Завершённые",
  "С вакансиями",
] as const;
