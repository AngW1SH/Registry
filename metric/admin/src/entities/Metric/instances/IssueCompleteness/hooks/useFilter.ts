import { IMetric, MetricName } from "@/entities/Metric";
import { IssuesMetric, useFilterIssues } from "../../Issues";

export const useFilter = (dependencies: IMetric[], resourceId: string) => {
  const issues = dependencies.find(
    (metric) => metric.name === MetricName.Issues
  ) as IssuesMetric;

  return useFilterIssues(issues?.data || [], resourceId);
};
