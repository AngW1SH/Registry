import { ProjectStatus } from "../config/initialFilters";

export type Filters = {
  text: string;
  dateStart: Date | null;
  dateEnd: Date | null;
  enrollmentStart: Date | null;
  enrollmentEnd: Date | null;
  status: string | null;
  tags: string[] | null;
};

export type ProjectStatusValue =
  | "Все"
  | "Активные"
  | "Завершённые"
  | "С вакансиями";
