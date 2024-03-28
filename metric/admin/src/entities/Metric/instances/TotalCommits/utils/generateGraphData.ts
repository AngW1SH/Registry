import { monthNames } from "@/shared/utils/Month";
import { TotalCommits } from "../types/validate";

export const generateGraphData = (
  data: TotalCommits
): { values: number[]; labels: string[] } => {
  const values: number[] = monthNames.map(() => 0);

  data.forEach((x) => {
    values[x.timestamp.getMonth()] += 1;
  });

  const labels = monthNames.filter((_, i) => {
    return values[i] !== 0;
  });

  return {
    values: values.filter((val) => val),
    labels,
  };
};
