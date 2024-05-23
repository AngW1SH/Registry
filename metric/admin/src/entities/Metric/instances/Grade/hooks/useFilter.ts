import { useAppSelector } from "@/app/store";
import { Grade } from "../types";

export const useFilter = (data: Grade) => {
  const calendar = useAppSelector((state) => state.metric.calendar);

  const successData = data.filter((item) => !item.error && item.data);

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return successData
    .filter((item) => {
      if (startDate && new Date(item.timestamp) < startDate) return false;
      if (endDate && new Date(item.timestamp) > endDate) return false;

      return true;
    })
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
};
