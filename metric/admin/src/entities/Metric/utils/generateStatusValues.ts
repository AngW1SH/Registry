import { MonthNames, monthNames } from "@/shared/utils/Month";
import { IGenericSnapshotList } from "../types";

export const generateStatusValues = (
  data: IGenericSnapshotList,
  labels: MonthNames[]
): { success: number; failed: number }[] => {
  const values = monthNames.map(() => ({ success: 0, failed: 0 }));

  data.forEach((x) => {
    if (x.error) {
      values[x.timestamp.getMonth()].failed += 1;
    } else {
      values[x.timestamp.getMonth()].success += 1;
    }
  });

  return values.filter((_, i) => {
    return labels.indexOf(monthNames[i]) !== -1;
  });
};
