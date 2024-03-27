import { CommitsPerDaySchema } from "../types/validate";

export const useData = (
  data: unknown,
  calendar: { start: Date | null; end: Date | null }
) => {
  const parseResult = CommitsPerDaySchema.safeParse(data);
  if (!parseResult.success) return [];

  return parseResult.data.filter((item) => {
    if (calendar.start && item.timestamp < calendar.start) return false;
    if (calendar.end && item.timestamp > calendar.end) return false;

    return true;
  });
};
