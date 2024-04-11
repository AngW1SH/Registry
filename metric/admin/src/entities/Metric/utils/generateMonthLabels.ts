import { MonthNames, monthNames } from "@/shared/utils/Month";
import { IGenericSnapshotList } from "../types";

export const generateMonthLabels = (
  data: IGenericSnapshotList
): MonthNames[] => {
  const values: number[] = monthNames.map(() => 0);

  data.forEach((x) => {
    values[new Date(x.timestamp).getMonth()] += 1;
  });

  return monthNames.filter((_, i) => {
    return values[i] !== 0;
  });
};
