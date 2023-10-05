import { ProjectStatus } from "../config/initialFilters";

export type Filters = {
  text: string;
  dateStart: string | null;
  dateEnd: string | null;
  enrollmentStart: string | null;
  enrollmentEnd: string | null;
  status: string | null;
  tags: string[] | null;
};

export type ProjectStatusValue =
  | "Все"
  | "Активные"
  | "Завершённые"
  | "С вакансиями";
