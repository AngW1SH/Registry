import { Commits } from "../../Commits";
import { TotalCommitsMetric } from "../types";

export const getGrade = (
  metric: TotalCommitsMetric,
  result: number,
  data: Commits,
  calendar: { start: string | null; end: string | null }
) => {
  return Math.min(result / 200, 5);
};
