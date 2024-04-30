import { IMetric } from "../types";
import { extractUsers as extractCommitsUsers } from "../instances/Commits/utils/extractUsers";

export const extractUsers = (metric: IMetric): string[] => {
  if (!metric || !metric.data) return [];

  switch (metric.name) {
    case "Commits":
      return extractCommitsUsers(metric.data);
    default:
      return [];
  }
};
