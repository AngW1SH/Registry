import { Grade } from "../types";

export const useData = (
  data: Grade,
  calendar: { start: string | null; end: string | null }
) => {
  const successData = data.filter((item) => !item.error && item.data);

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return successData.filter((item) => {
    if (startDate && new Date(item.timestamp) < startDate) return false;
    if (endDate && new Date(item.timestamp) > endDate) return false;

    return true;
  });
};