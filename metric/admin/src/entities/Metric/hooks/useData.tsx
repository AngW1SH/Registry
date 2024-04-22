import { GenericSnapshotListSchema } from "../types";

export const useData = (
  data: unknown,
  calendar: { start: string | null; end: string | null }
) => {
  const parseResult = GenericSnapshotListSchema.safeParse(data);
  if (!parseResult.success) return [];

  const startDate = calendar.start ? new Date(calendar.start) : null;
  const endDate = calendar.end ? new Date(calendar.end) : null;

  return parseResult.data.filter((item) => {
    if (startDate && new Date(item.timestamp) < startDate) return false;
    if (endDate && new Date(item.timestamp) > endDate) return false;

    return true;
  });
};
