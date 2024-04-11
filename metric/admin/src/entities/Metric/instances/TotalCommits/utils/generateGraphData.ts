import { monthNames } from "@/shared/utils/Month";
import { Commits } from "../../Commits";

export const generateGraphData = (
  data: Commits
): { values: number[]; labels: string[] } => {
  const values: number[] = monthNames.map(() => {
    return -1;
  });

  data.forEach((x) => {
    const month = new Date(x.data.commit.author.date).getMonth();

    values[month] += 1;
  });

  const labels = monthNames.filter((_, i) => {
    return values[i] !== -1;
  });

  return {
    values: values.filter((val) => val != -1).map((val) => val + 1), // compensate for -1
    labels,
  };
};
