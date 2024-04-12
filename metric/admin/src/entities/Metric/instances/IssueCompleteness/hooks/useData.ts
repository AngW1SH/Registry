import { Issues } from "../../Issues";

export const useData = (
  data: Issues,
  calendar: { start: string | null; end: string | null }
) => {
  const successData = data.filter((item) => !item.error && item.data) || [];

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return successData.filter((item) => {
    if (startDate && new Date(item.data.created_at) < new Date(startDate))
      return false;
    if (endDate && new Date(item.data.created_at) > endDate) return false;

    return true;
  });
};
