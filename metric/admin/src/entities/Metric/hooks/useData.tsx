import { GenericSnapshotListSchema } from "../types";

export const useData = (data: unknown) => {
  const parseResult = GenericSnapshotListSchema.safeParse(data);
  if (!parseResult.success) return [];

  return parseResult.data;
};
