import { Issues } from "../../Issues";

export const useData = (
  data: Issues,
  calendar: { start: Date | null; end: Date | null }
) => {
  const successData = data.filter((item) => !item.error && item.data);

  return successData.filter((item) => {
    if (calendar.start && new Date(item.data.created_at) < calendar.start)
      return false;
    if (calendar.end && new Date(item.data.created_at) > calendar.end)
      return false;

    return true;
  });
};
