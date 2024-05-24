import { useFilterCommits, CommitsMetric } from "../../Commits";
import { IMetric, MetricName } from "@/entities/Metric";

export const useFilter = (dependencies: IMetric[], resourceId: string) => {
  const commits = dependencies.find(
    (metric) => metric.name === MetricName.Commits
  ) as CommitsMetric;

  return useFilterCommits(commits?.data || [], resourceId);
};
