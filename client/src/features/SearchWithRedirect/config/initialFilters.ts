import { Filters } from "../types/types";

export const initialFilters: Filters = {
  status: "Все",
  enrollDate: null,
  projectDate: null,
};

export const ProjectStatus = [
  "Все",
  "Активные",
  "Завершённые",
  "С вакансиями",
] as const;

export const ProjectStatusValues = [""];
