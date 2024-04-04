import { IGenericSnapshotList } from "@/entities/Metric/types";
import { IssueCompletenessSchema } from "../types/validate";

export const useData = (
  data: IGenericSnapshotList,
  calendar: { start: Date | null; end: Date | null }
) => {
  const successData = data.filter((item) => !item.error && item.data);

  const parseResult = IssueCompletenessSchema.safeParse(successData);
  if (!parseResult.success) return [];

  return parseResult.data.filter((item) => {
    if (calendar.start && item.timestamp < calendar.start) return false;
    if (calendar.end && item.timestamp > calendar.end) return false;

    return true;
  });
};