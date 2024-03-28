import { monthNames } from "@/shared/utils/Month";
import { TotalCommits } from "../types/validate";

export const generateGraphData = (
  data: TotalCommits
): { values: number[]; labels: string[] } => {
  const values: {
    date: Date;
    value: number;
  }[] = monthNames.map(() => {
    return { date: new Date("01.01.1970"), value: -1 };
  });

  data.forEach((x) => {
    const month = x.timestamp.getMonth();

    if (values[month].date < x.timestamp) {
      values[month] = {
        date: x.timestamp,
        value: x.data.value,
      };
    }
  });

  const labels = monthNames.filter((_, i) => {
    return values[i].value !== -1;
  });

  return {
    values: values.filter((val) => val.value != -1).map((val) => val.value),
    labels,
  };
};
