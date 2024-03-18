import { CommitsPerDaySchema } from "../types/validate";

export const useData = (data: unknown) => {
  const parseResult = CommitsPerDaySchema.safeParse(data);
  if (!parseResult.success) return [];

  return parseResult.data;
};
