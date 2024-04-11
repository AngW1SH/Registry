import { IGenericMetric, MetricName } from "@/entities/Metric/types";

export interface TotalCommitsMetric extends IGenericMetric {
  name: MetricName.TotalCommits;
}
