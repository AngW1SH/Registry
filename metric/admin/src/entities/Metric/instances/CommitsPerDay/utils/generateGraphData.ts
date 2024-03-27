import { CommitsPerDay } from "../types/validate";

export enum MonthNames {
  Jan = "Jan",
  Feb = "Feb",
  Mar = "Mar",
  Apr = "Apr",
  May = "May",
  Jun = "Jun",
  Jul = "Jul",
  Aug = "Aug",
  Sep = "Sep",
  Oct = "Oct",
  Nov = "Nov",
  Dec = "Dec",
}

export const monthNames = [
  MonthNames.Jan,
  MonthNames.Feb,
  MonthNames.Mar,
  MonthNames.Apr,
  MonthNames.May,
  MonthNames.Jun,
  MonthNames.Jul,
  MonthNames.Aug,
  MonthNames.Sep,
  MonthNames.Oct,
  MonthNames.Nov,
  MonthNames.Dec,
];

export const generateGraphData = (
  data: CommitsPerDay
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
