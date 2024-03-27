import { GenericSnapshotListSchema } from "../types";

export const useData = (
  data: unknown,
  calendar: { start: Date | null; end: Date | null }
) => {
  const parseResult = GenericSnapshotListSchema.safeParse(data);
  if (!parseResult.success) return [];

  return parseResult.data.filter((item) => {
    if (calendar.start && item.timestamp < calendar.start) return false;
    if (calendar.end && item.timestamp > calendar.end) return false;

    return true;
  });
};
