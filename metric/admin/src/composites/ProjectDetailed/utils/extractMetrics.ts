import { IMetric } from "@/entities/Metric";
import { IProjectDetailed } from "..";

export const extractMetrics = (data: IProjectDetailed): IMetric[] => {
  const metrics: IMetric[] = [];

  data.resources.forEach((resource) => {
    metrics.push(...resource.metrics);
  });

  return metrics;
};
