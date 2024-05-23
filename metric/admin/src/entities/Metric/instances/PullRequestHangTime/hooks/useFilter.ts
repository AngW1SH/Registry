import { PullRequestsMetric, useFilterPullRequests } from "../../PullRequests";
import { IMetric, MetricName } from "@/entities/Metric";

export const useFilter = (dependencies: IMetric[], resourceId: string) => {
  const pullRequests = dependencies.find(
    (metric) => metric.name === MetricName.PullRequests
  ) as PullRequestsMetric;

  return useFilterPullRequests(pullRequests?.data || [], resourceId);
};
